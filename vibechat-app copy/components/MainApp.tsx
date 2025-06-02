"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import BottomNavigation from "./navigation/BottomNavigation"
import ChatList from "./chat/ChatList"
import StoriesView from "./stories/StoriesView"
import DiscoverView from "./discover/DiscoverView"
import ProfileView from "./profile/ProfileView"
import ChatInterface from "./chat/ChatInterface"
import VoiceRecorder from "./voice/VoiceRecorder"
import StoryCamera from "./stories/StoryCamera"
import NotificationCenter from "./notifications/NotificationCenter"
import { useNotifications } from "@/contexts/NotificationContext"

export default function MainApp() {
  const [activeTab, setActiveTab] = useState("chats")
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)
  const [showStoryCamera, setShowStoryCamera] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { requestPermission, hasPermission } = useNotifications()

  useEffect(() => {
    // Request notification permission on app load
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  const handleFloatingActionClick = () => {
    if (activeTab === "stories") {
      setShowStoryCamera(true)
    } else {
      // Open new chat composer
      console.log("Open new chat")
    }
  }

  const renderContent = () => {
    if (selectedChat) {
      return (
        <ChatInterface
          chat={selectedChat}
          onBack={() => setSelectedChat(null)}
          onVoiceRecord={() => setShowVoiceRecorder(true)}
        />
      )
    }

    switch (activeTab) {
      case "chats":
        return <ChatList onChatSelect={setSelectedChat} />
      case "stories":
        return <StoriesView onCreateStory={() => setShowStoryCamera(true)} />
      case "discover":
        return <DiscoverView />
      case "profile":
        return <ProfileView />
      default:
        return <ChatList onChatSelect={setSelectedChat} />
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] relative">
      {/* Main Content */}
      <div className="pb-20">{renderContent()}</div>

      {/* Floating Action Button */}
      {!selectedChat && (
        <button onClick={handleFloatingActionClick} className="floating-action-button">
          <Plus size={24} className="text-white" />
        </button>
      )}

      {/* Bottom Navigation */}
      {!selectedChat && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onNotificationsClick={() => setShowNotifications(true)}
        />
      )}

      {/* Voice Recorder Modal */}
      {showVoiceRecorder && (
        <VoiceRecorder
          onClose={() => setShowVoiceRecorder(false)}
          onSendVoice={(audioBlob, duration, waveform) => {
            // Handle voice message sending
            console.log("Voice message:", { audioBlob, duration, waveform })
            setShowVoiceRecorder(false)
          }}
        />
      )}

      {/* Story Camera Modal */}
      {showStoryCamera && <StoryCamera onClose={() => setShowStoryCamera(false)} />}

      {/* Notification Center */}
      {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
    </div>
  )
}
