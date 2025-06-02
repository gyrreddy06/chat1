"use client"

import { useState } from "react"
import { MoreHorizontal, Play, Pause } from "lucide-react"

interface MessageBubbleProps {
  message: {
    id: string
    text: string
    sender: string
    timestamp: string
    isSent: boolean
    type: "text" | "voice" | "image" | "video"
    duration?: number
    waveform?: number[]
  }
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playProgress, setPlayProgress] = useState(0)

  const quickReactions = ["❤️", "😂", "😮", "😢", "😡", "👍"]

  const handleVoicePlay = () => {
    if (message.type !== "voice") return

    setIsPlaying(!isPlaying)

    if (!isPlaying && message.duration) {
      // Simulate voice playback
      const duration = message.duration * 1000
      const interval = setInterval(() => {
        setPlayProgress((prev) => {
          const newProgress = prev + 100 / (duration / 100)
          if (newProgress >= 100) {
            clearInterval(interval)
            setIsPlaying(false)
            setPlayProgress(0)
            return 0
          }
          return newProgress
        })
      }, 100)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const renderMessageContent = () => {
    switch (message.type) {
      case "voice":
        return (
          <div className="flex items-center space-x-3 min-w-48">
            <button
              onClick={handleVoicePlay}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause size={16} className="text-white" />
              ) : (
                <Play size={16} className="text-white ml-0.5" />
              )}
            </button>

            <div className="flex-1">
              <div className="flex items-center space-x-1 h-6">
                {message.waveform?.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white/40 rounded-full transition-all duration-100"
                    style={{
                      width: "2px",
                      height: `${Math.max(2, value * 20)}px`,
                      backgroundColor:
                        index < (playProgress * message.waveform!.length) / 100 ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-white/70 mt-1">
                {message.duration ? formatDuration(message.duration) : "0:00"}
              </p>
            </div>
          </div>
        )

      case "image":
        return (
          <div className="space-y-2">
            <div className="w-48 h-32 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
              <span className="text-4xl">🖼️</span>
            </div>
            <p className="font-nunito text-sm">{message.text}</p>
          </div>
        )

      case "video":
        return (
          <div className="space-y-2">
            <div className="w-48 h-32 bg-[#2A2A2A] rounded-lg flex items-center justify-center relative">
              <span className="text-4xl">🎥</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                  <Play size={20} className="text-white ml-1" />
                </div>
              </div>
            </div>
            <p className="font-nunito text-sm">{message.text}</p>
          </div>
        )

      default:
        return <p className="font-nunito">{message.text}</p>
    }
  }

  return (
    <div className={`flex ${message.isSent ? "justify-end" : "justify-start"} group`}>
      <div className={`max-w-xs ${message.isSent ? "order-2" : "order-1"}`}>
        {/* Message Bubble */}
        <div
          className={`message-bubble ${message.isSent ? "message-bubble-sent" : "message-bubble-received"} relative`}
          onDoubleClick={() => setShowActions(!showActions)}
        >
          {renderMessageContent()}

          {/* Quick Actions */}
          <button
            className={`absolute -top-2 ${message.isSent ? "-left-8" : "-right-8"} opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-[#2A2A2A] rounded-full`}
            onClick={() => setShowActions(!showActions)}
          >
            <MoreHorizontal size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Quick Reactions */}
        {showActions && (
          <div className={`flex space-x-1 mt-2 ${message.isSent ? "justify-end" : "justify-start"} slide-in`}>
            {quickReactions.map((emoji) => (
              <button
                key={emoji}
                className="w-8 h-8 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                onClick={() => {
                  // Handle reaction
                  setShowActions(false)
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className={`text-xs text-gray-500 mt-1 font-nunito ${message.isSent ? "text-right" : "text-left"}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  )
}
