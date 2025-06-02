"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"

interface Message {
  id: string
  text: string
  sender: string
  timestamp: string
  isSent: boolean
  type: "text" | "voice" | "image" | "video"
  duration?: number
  waveform?: number[]
}

interface SocketContextType {
  messages: Message[]
  sendMessage: (message: Omit<Message, "id" | "timestamp">) => void
  isConnected: boolean
  typingUsers: string[]
  onlineUsers: string[]
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])

  useEffect(() => {
    if (isAuthenticated && user) {
      // Simulate WebSocket connection
      setIsConnected(true)
      setOnlineUsers(["Alex Chen", "Maya Rodriguez", "Sarah Kim"])

      // Simulate receiving messages
      const mockMessages: Message[] = [
        {
          id: "1",
          text: "Hey! Did you see the new Marvel trailer? It's absolutely insane! 🔥",
          sender: "Alex Chen",
          timestamp: "2:30 PM",
          isSent: false,
          type: "text",
        },
        {
          id: "2",
          text: "OMG YES! The special effects look incredible. Can't wait for the release! 🚀",
          sender: "You",
          timestamp: "2:32 PM",
          isSent: true,
          type: "text",
        },
        {
          id: "3",
          text: "Voice message",
          sender: "Alex Chen",
          timestamp: "2:35 PM",
          isSent: false,
          type: "voice",
          duration: 15,
          waveform: [0.2, 0.5, 0.8, 0.3, 0.7, 0.4, 0.9, 0.1, 0.6, 0.8, 0.2, 0.5, 0.7, 0.3, 0.4],
        },
      ]
      setMessages(mockMessages)

      // Simulate typing indicator
      setTimeout(() => {
        setTypingUsers(["Alex Chen"])
        setTimeout(() => setTypingUsers([]), 3000)
      }, 5000)
    }
  }, [isAuthenticated, user])

  const sendMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, newMessage])

    // Simulate receiving a response
    if (message.type === "text") {
      setTimeout(() => {
        const responses = [
          "That's awesome! 🔥",
          "I totally agree! ✨",
          "Can't wait to try that! 🚀",
          "Thanks for sharing! 💫",
          "So cool! 😍",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "Alex Chen",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSent: false,
          type: "text",
        }
        setMessages((prev) => [...prev, responseMessage])
      }, 2000)
    }
  }

  return (
    <SocketContext.Provider
      value={{
        messages,
        sendMessage,
        isConnected,
        typingUsers,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}
