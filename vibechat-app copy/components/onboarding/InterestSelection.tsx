"use client"

import { useState } from "react"
import { Music, Gamepad2, Camera, Palette, Coffee, Plane, Book, Heart } from "lucide-react"

interface InterestSelectionProps {
  onNext: () => void
}

export default function InterestSelection({ onNext }: InterestSelectionProps) {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([])

  const interests = [
    { icon: Music, label: "Music", color: "from-[#FF1493] to-[#9370DB]" },
    { icon: Gamepad2, label: "Gaming", color: "from-[#1E90FF] to-[#32CD32]" },
    { icon: Camera, label: "Photography", color: "from-[#32CD32] to-[#FF1493]" },
    { icon: Palette, label: "Art", color: "from-[#9370DB] to-[#1E90FF]" },
    { icon: Coffee, label: "Food", color: "from-[#FF1493] to-[#32CD32]" },
    { icon: Plane, label: "Travel", color: "from-[#1E90FF] to-[#9370DB]" },
    { icon: Book, label: "Reading", color: "from-[#32CD32] to-[#9370DB]" },
    { icon: Heart, label: "Lifestyle", color: "from-[#9370DB] to-[#FF1493]" },
  ]

  const toggleInterest = (index: number) => {
    setSelectedInterests((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8">
      <div className="text-center mb-8 fade-in">
        <h2 className="text-3xl font-bold font-poppins mb-4 text-white">What's Your Vibe?</h2>
        <p className="text-gray-300 font-nunito">Select your interests to connect with like-minded people</p>
      </div>

      {/* Interest Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
        {interests.map((interest, index) => {
          const Icon = interest.icon
          const isSelected = selectedInterests.includes(index)

          return (
            <button
              key={index}
              onClick={() => toggleInterest(index)}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                isSelected
                  ? `bg-gradient-to-r ${interest.color} scale-105 glow-effect`
                  : "bg-[#2A2A2A] hover:bg-[#3A3A3A] hover:scale-105"
              }`}
            >
              <Icon size={24} className="mx-auto mb-2" />
              <span className="text-sm font-nunito font-medium">{interest.label}</span>
            </button>
          )
        })}
      </div>

      <div className="text-center mb-8">
        <p className="text-sm text-gray-400 font-nunito">{selectedInterests.length} interests selected</p>
      </div>

      <button
        onClick={onNext}
        disabled={selectedInterests.length === 0}
        className={`pill-button text-white font-semibold transition-all duration-300 ${
          selectedInterests.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        }`}
      >
        Start Chatting
      </button>
    </div>
  )
}
