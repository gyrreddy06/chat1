"use client"

import { MessageCircle, Camera, Compass, User, Bell } from "lucide-react"
import { useNotifications } from "@/contexts/NotificationContext"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onNotificationsClick: () => void
}

export default function BottomNavigation({ activeTab, onTabChange, onNotificationsClick }: BottomNavigationProps) {
  const { unreadCount } = useNotifications()

  const tabs = [
    { id: "chats", icon: MessageCircle, label: "Chats" },
    { id: "stories", icon: Camera, label: "Stories" },
    { id: "discover", icon: Compass, label: "Discover" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-[#2A2A2A] px-4 py-2">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 ${
                isActive ? "bg-gradient-to-r from-[#1E90FF]/20 to-[#FF1493]/20" : "hover:bg-[#2A2A2A]"
              }`}
            >
              <Icon
                size={24}
                className={`mb-1 transition-colors duration-300 ${isActive ? "text-[#1E90FF]" : "text-gray-400"}`}
              />
              <span
                className={`text-xs font-nunito transition-colors duration-300 ${
                  isActive ? "text-[#1E90FF]" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
              {/* Unread indicator */}
              {tab.id === "chats" && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF1493] rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
              )}
            </button>
          )
        })}

        {/* Notifications Button */}
        <button
          onClick={onNotificationsClick}
          className="relative flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 hover:bg-[#2A2A2A]"
        >
          <Bell size={24} className="mb-1 text-gray-400" />
          <span className="text-xs font-nunito text-gray-400">Alerts</span>

          {/* Unread badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF1493] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
