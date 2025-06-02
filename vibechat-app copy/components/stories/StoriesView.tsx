"use client"

import { useState } from "react"
import { Plus, Play } from "lucide-react"

interface StoriesViewProps {
  onCreateStory: () => void
}

export default function StoriesView({ onCreateStory }: StoriesViewProps) {
  const [selectedStory, setSelectedStory] = useState<any>(null)

  const stories = [
    {
      id: 1,
      user: "Your Story",
      avatar: "📸",
      isOwn: true,
      hasStory: false,
      timestamp: null,
    },
    {
      id: 2,
      user: "Alex Chen",
      avatar: "🚀",
      isOwn: false,
      hasStory: true,
      timestamp: "2h",
      viewed: false,
    },
    {
      id: 3,
      user: "Maya Rodriguez",
      avatar: "☕",
      isOwn: false,
      hasStory: true,
      timestamp: "4h",
      viewed: true,
    },
    {
      id: 4,
      user: "Squad Goals",
      avatar: "🎵",
      isOwn: false,
      hasStory: true,
      timestamp: "6h",
      viewed: false,
    },
    {
      id: 5,
      user: "Emma Wilson",
      avatar: "📚",
      isOwn: false,
      hasStory: true,
      timestamp: "8h",
      viewed: true,
    },
  ]

  const recentUpdates = [
    {
      id: 1,
      user: "Jake Miller",
      avatar: "🎮",
      content: "Just hit Diamond rank! 💎",
      timestamp: "1h",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      user: "Sarah Kim",
      avatar: "🎨",
      content: "New artwork finished! What do you think? 🎨✨",
      timestamp: "3h",
      likes: 67,
      comments: 15,
    },
    {
      id: 3,
      user: "Gaming Squad",
      avatar: "🎮",
      content: "Tournament starts in 30 minutes! Who's ready? 🔥",
      timestamp: "5h",
      likes: 89,
      comments: 23,
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-[#121212]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#2A2A2A]">
        <h1 className="text-2xl font-bold font-poppins text-white">Stories</h1>
      </div>

      {/* Stories Row */}
      <div className="px-6 py-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => (story.isOwn ? onCreateStory() : setSelectedStory(story))}
              className="flex-shrink-0 flex flex-col items-center space-y-2"
            >
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl ${
                    story.isOwn
                      ? "bg-[#2A2A2A] border-2 border-dashed border-gray-500"
                      : story.hasStory && !story.viewed
                        ? "bg-gradient-to-r from-[#1E90FF] to-[#FF1493] p-0.5"
                        : story.viewed
                          ? "bg-gray-600 p-0.5"
                          : "bg-[#2A2A2A]"
                  }`}
                >
                  {!story.isOwn && story.hasStory && (
                    <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center">
                      {story.avatar}
                    </div>
                  )}
                  {story.isOwn && (
                    <>
                      {story.avatar}
                      <Plus size={16} className="absolute bottom-0 right-0 bg-[#1E90FF] text-white rounded-full p-1" />
                    </>
                  )}
                  {!story.isOwn && !story.hasStory && story.avatar}
                </div>
                {story.hasStory && !story.isOwn && (
                  <Play size={12} className="absolute bottom-0 right-0 bg-[#FF1493] text-white rounded-full p-1" />
                )}
              </div>
              <span className="text-xs font-nunito text-gray-300 text-center max-w-16 truncate">{story.user}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="flex-1 px-6">
        <h2 className="text-lg font-semibold font-poppins text-white mb-4">Recent Updates</h2>
        <div className="space-y-4">
          {recentUpdates.map((update) => (
            <div key={update.id} className="bg-[#1E1E1E] rounded-xl p-4 fade-in">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center text-lg">
                  {update.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold font-poppins text-white">{update.user}</h3>
                  <p className="text-xs text-gray-400 font-nunito">{update.timestamp} ago</p>
                </div>
              </div>
              <p className="text-white font-nunito mb-3">{update.content}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <button className="flex items-center space-x-1 hover:text-[#FF1493] transition-colors">
                  <span>❤️</span>
                  <span>{update.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-[#1E90FF] transition-colors">
                  <span>💬</span>
                  <span>{update.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
