"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile, Paperclip, Mic } from "lucide-react"
import MessageBubble from "./MessageBubble"
import EmojiReactions from "./EmojiReactions"
import { useSocket } from "@/contexts/SocketContext"

interface ChatInterfaceProps {
  chat: any
  onBack: () => void
  onVoiceRecord: () => void
}

export default function ChatInterface({ chat, onBack, onVoiceRecord }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { messages, sendMessage, typingUsers, isConnected } = useSocket()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage({
        text: message,
        sender: "You",
        isSent: true,
        type: "text",
      })
      setMessage("")
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#121212]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1E1E1E] border-b border-[#2A2A2A]">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
            <ArrowLeft size={20} className="text-white" />
          </button>

          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center text-lg">
              {chat.avatar}
            </div>
            {chat.isOnline && <div className="absolute -bottom-1 -right-1 status-indicator" />}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold font-poppins text-white">{chat.name}</h2>
              {!isConnected && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Disconnected" />}
            </div>
            <p className="text-xs text-gray-400 font-nunito">
              {typingUsers.length > 0
                ? `${typingUsers[0]} is typing...`
                : chat.isOnline
                  ? "Online"
                  : "Last seen 2h ago"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
            <Phone size={20} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
            <Video size={20} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
            <MoreVertical size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center space-x-2 slide-in">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
            <span className="text-xs text-gray-400 font-nunito">{typingUsers[0]} is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-4 py-3 bg-[#1E1E1E] border-t border-[#2A2A2A]">
        <div className="flex items-center space-x-3">
          <button onClick={handleFileUpload} className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
            <Paperclip size={20} className="text-gray-400" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full bg-[#2A2A2A] text-white px-4 py-3 pr-12 rounded-xl font-nunito focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-all"
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[#3A3A3A] rounded-full transition-colors"
            >
              <Smile size={18} className="text-gray-400" />
            </button>
          </div>

          {message.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-2 bg-gradient-to-r from-[#1E90FF] to-[#FF1493] rounded-full transition-all hover:scale-105"
            >
              <Send size={20} className="text-white" />
            </button>
          ) : (
            <button onClick={onVoiceRecord} className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
              <Mic size={20} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <EmojiReactions
            onEmojiSelect={(emoji) => {
              setMessage(message + emoji)
              setShowEmojiPicker(false)
            }}
          />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            // Handle file upload
            sendMessage({
              text: `Shared ${file.type.startsWith("image") ? "an image" : "a video"}`,
              sender: "You",
              isSent: true,
              type: file.type.startsWith("image") ? "image" : "video",
            })
          }
        }}
      />
    </div>
  )
}
