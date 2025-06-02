"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"

interface Notification {
  id: string
  title: string
  message: string
  type: "message" | "friend_request" | "group_invite" | "story_mention"
  timestamp: string
  isRead: boolean
  avatar?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  requestPermission: () => Promise<boolean>
  hasPermission: boolean
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    // Check notification permission
    if ("Notification" in window) {
      setHasPermission(Notification.permission === "granted")
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      // Simulate receiving notifications
      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "New Message",
          message: "Alex Chen: Hey! Check out this amazing video 🔥",
          type: "message",
          timestamp: "2 minutes ago",
          isRead: false,
          avatar: "🚀",
        },
        {
          id: "2",
          title: "Friend Request",
          message: "Maya Rodriguez wants to connect with you",
          type: "friend_request",
          timestamp: "1 hour ago",
          isRead: false,
          avatar: "☕",
        },
        {
          id: "3",
          title: "Group Invite",
          message: "You've been invited to join 'Study Buddies 📚'",
          type: "group_invite",
          timestamp: "3 hours ago",
          isRead: true,
          avatar: "📚",
        },
      ]
      setNotifications(mockNotifications)

      // Simulate receiving new notifications
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const newNotification: Notification = {
            id: Date.now().toString(),
            title: "New Message",
            message: "Someone sent you a message! 📱",
            type: "message",
            timestamp: "Just now",
            isRead: false,
            avatar: "💫",
          }
          setNotifications((prev) => [newNotification, ...prev])

          // Show browser notification if permission granted
          if (hasPermission) {
            new Notification(newNotification.title, {
              body: newNotification.message,
              icon: "/placeholder.svg?height=64&width=64",
              badge: "/placeholder.svg?height=32&width=32",
            })
          }
        }
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [isAuthenticated, hasPermission])

  const requestPermission = async (): Promise<boolean> => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setHasPermission(permission === "granted")
      return permission === "granted"
    }
    return false
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        requestPermission,
        hasPermission,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
