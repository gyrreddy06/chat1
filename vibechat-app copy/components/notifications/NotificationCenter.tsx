"use client"

import { X, Check, CheckCheck, UserPlus, Users } from "lucide-react"
import { useNotifications } from "@/contexts/NotificationContext"

interface NotificationCenterProps {
  onClose: () => void
}

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications()

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return "💬"
      case "friend_request":
        return "👥"
      case "group_invite":
        return "🎉"
      case "story_mention":
        return "📸"
      default:
        return "🔔"
    }
  }

  const getNotificationAction = (notification: any) => {
    switch (notification.type) {
      case "friend_request":
        return (
          <div className="flex space-x-2">
            <button className="bg-[#32CD32] text-white px-3 py-1 rounded-full text-xs font-nunito hover:bg-[#32CD32]/80 transition-colors">
              Accept
            </button>
            <button className="bg-[#2A2A2A] text-gray-400 px-3 py-1 rounded-full text-xs font-nunito hover:bg-[#3A3A3A] transition-colors">
              Decline
            </button>
          </div>
        )
      case "group_invite":
        return (
          <div className="flex space-x-2">
            <button className="bg-gradient-to-r from-[#1E90FF] to-[#FF1493] text-white px-3 py-1 rounded-full text-xs font-nunito hover:scale-105 transition-transform">
              Join
            </button>
            <button className="bg-[#2A2A2A] text-gray-400 px-3 py-1 rounded-full text-xs font-nunito hover:bg-[#3A3A3A] transition-colors">
              Pass
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 fade-in">
      <div className="bg-[#121212] h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
          <div>
            <h2 className="text-xl font-bold font-poppins text-white">Notifications</h2>
            {unreadCount > 0 && <p className="text-sm text-gray-400 font-nunito">{unreadCount} unread</p>}
          </div>

          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors"
                title="Mark all as read"
              >
                <CheckCheck size={20} className="text-gray-400" />
              </button>
            )}

            <button onClick={onClose} className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-lg font-semibold font-poppins text-white mb-2">No Notifications</h3>
              <p className="text-gray-400 font-nunito">
                You're all caught up! We'll notify you when something new happens.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-[#2A2A2A] hover:bg-[#1E1E1E] transition-colors ${
                    !notification.isRead ? "bg-[#1E1E1E]/50" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Notification Icon */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center text-lg flex-shrink-0">
                      {notification.avatar || getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold font-poppins text-white text-sm">{notification.title}</h4>
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 hover:bg-[#2A2A2A] rounded-full transition-colors"
                            title="Mark as read"
                          >
                            <Check size={16} className="text-[#1E90FF]" />
                          </button>
                        )}
                      </div>

                      <p className="text-gray-400 font-nunito text-sm mb-2 line-clamp-2">{notification.message}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-nunito">{notification.timestamp}</span>

                        {getNotificationAction(notification)}
                      </div>
                    </div>

                    {/* Unread Indicator */}
                    {!notification.isRead && <div className="w-2 h-2 bg-[#FF1493] rounded-full flex-shrink-0 mt-2" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-[#1E1E1E] border-t border-[#2A2A2A]">
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-[#2A2A2A] hover:bg-[#3A3A3A] p-3 rounded-xl transition-colors flex items-center justify-center space-x-2">
              <UserPlus size={16} className="text-gray-400" />
              <span className="text-sm font-nunito text-gray-400">Add Friends</span>
            </button>

            <button className="bg-[#2A2A2A] hover:bg-[#3A3A3A] p-3 rounded-xl transition-colors flex items-center justify-center space-x-2">
              <Users size={16} className="text-gray-400" />
              <span className="text-sm font-nunito text-gray-400">Join Groups</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
