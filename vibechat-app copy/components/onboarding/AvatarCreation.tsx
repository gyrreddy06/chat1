"use client"

import { useState } from "react"
import { Camera, Sparkles, Palette } from "lucide-react"

interface AvatarCreationProps {
  onNext: () => void
}

export default function AvatarCreation({ onNext }: AvatarCreationProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(0)

  const avatarOptions = [
    { bg: "from-[#1E90FF] to-[#9370DB]", emoji: "😎" },
    { bg: "from-[#FF1493] to-[#32CD32]", emoji: "🚀" },
    { bg: "from-[#32CD32] to-[#1E90FF]", emoji: "✨" },
    { bg: "from-[#9370DB] to-[#FF1493]", emoji: "🔥" },
    { bg: "from-[#FF1493] to-[#1E90FF]", emoji: "💫" },
    { bg: "from-[#32CD32] to-[#9370DB]", emoji: "🌟" },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8">
      <div className="text-center mb-8 fade-in">
        <h2 className="text-3xl font-bold font-poppins mb-4 text-white">Create Your Vibe</h2>
        <p className="text-gray-300 font-nunito">Choose an avatar that represents your energy</p>
      </div>

      {/* Avatar Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {avatarOptions.map((avatar, index) => (
          <button
            key={index}
            onClick={() => setSelectedAvatar(index)}
            className={`w-20 h-20 rounded-full bg-gradient-to-r ${avatar.bg} flex items-center justify-center text-2xl transition-all duration-300 ${
              selectedAvatar === index ? "scale-110 glow-effect" : "scale-100 hover:scale-105"
            }`}
          >
            {avatar.emoji}
          </button>
        ))}
      </div>

      {/* AR Filter Options */}
      <div className="flex space-x-4 mb-8">
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#2A2A2A] rounded-full text-sm font-nunito hover:bg-[#3A3A3A] transition-colors">
          <Camera size={16} />
          <span>Take Photo</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#2A2A2A] rounded-full text-sm font-nunito hover:bg-[#3A3A3A] transition-colors">
          <Sparkles size={16} />
          <span>AR Filters</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#2A2A2A] rounded-full text-sm font-nunito hover:bg-[#3A3A3A] transition-colors">
          <Palette size={16} />
          <span>Customize</span>
        </button>
      </div>

      <button onClick={onNext} className="pill-button text-white font-semibold">
        Continue
      </button>
    </div>
  )
}
