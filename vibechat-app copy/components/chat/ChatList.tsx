"use client"

import { useState } from "react"
import { Search, MoreVertical } from "lucide-react"

interface ChatListProps {
  onChatSelect: (chat: any) => void
}

export default function ChatList({ onChatSelect }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const chats = [
    {
      id: 1,
      name: "Squad Goals 💫",
      lastMessage: "Sarah: Just dropped the new playlist! 🎵",
      time: "2m",
      unread: 3,
      avatar: "🎵",
      isGroup: true,
      members: 8,
      isOnline: true,
    },
    {
      id: 2,
      name: "Alex Chen",
      lastMessage: "Yo! Did you see the new Marvel trailer?",
      time: "15m",
      unread: 1,
      avatar: "🚀",
      isGroup: false,
      isOnline: true,
    },
    {
      id: 3,
      name: "Study Buddies 📚",
      lastMessage: "Emma: Meeting at 3pm in the library",
      time: "1h",
      unread: 0,
      avatar: "📚",
      isGroup: true,
      members: 12,
      isOnline: false,
    },
    {
      id: 4,
      name: "Maya Rodriguez",
      lastMessage: "Thanks for the coffee recommendation! ☕",
      time: "3h",
      unread: 0,
      avatar: "☕",
      isGroup: false,
      isOnline: false,
    },
    {
      id: 5,
      name: "Gaming Squad 🎮",
      lastMessage: "Jake: Anyone up for Valorant tonight?",
      time: "5h",
      unread: 7,
      avatar: "🎮",
      isGroup: true,
      members: 15,
      isOnline: true,
    },
  ]

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col h-screen bg-[#121212]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold font-poppins text-white">Chats</h1>
          <button className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
            <MoreVertical size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2A2A2A] text-white pl-10 pr-4 py-3 rounded-xl font-nunito focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-all"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="w-full px-6 py-4 hover:bg-[#1E1E1E] transition-colors flex items-center space-x-4"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center text-xl">
                {chat.avatar}
              </div>
              {chat.isOnline && <div className="absolute -bottom-1 -right-1 status-indicator" />}
            </div>

            {/* Chat Info */}
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold font-poppins text-white flex items-center">
                  {chat.name}
                  {chat.isGroup && (
                    <span className="ml-2 text-xs bg-[#2A2A2A] px-2 py-1 rounded-full text-gray-400">
                      {chat.members}
                    </span>
                  )}
                </h3>
                <span className="text-xs text-gray-400 font-nunito">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-400 font-nunito truncate">{chat.lastMessage}</p>
            </div>

            {/* Unread Badge */}
            {chat.unread > 0 && (
              <div className="w-6 h-6 bg-[#FF1493] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{chat.unread}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
