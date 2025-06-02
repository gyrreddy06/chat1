"use client"

import { useEffect, useState } from "react"
import { MessageCircle, Sparkles } from "lucide-react"

export default function LoadingScreen() {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    setIsAnimated(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div
          className={`mb-8 transition-all duration-1000 ${isAnimated ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center glow-effect animate-pulse">
              <MessageCircle size={48} className="text-white" />
            </div>
            <Sparkles size={20} className="absolute -top-2 -right-2 text-[#32CD32] animate-spin" />
          </div>
        </div>

        {/* Loading Text */}
        <div
          className={`transition-all duration-1000 delay-300 ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <h1 className="text-2xl font-bold font-poppins mb-2 bg-gradient-to-r from-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">
            VibeChat
          </h1>
          <p className="text-gray-400 font-nunito">Getting your vibes ready...</p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#1E90FF] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
