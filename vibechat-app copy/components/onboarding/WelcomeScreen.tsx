"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Sparkles } from "lucide-react"

interface WelcomeScreenProps {
  onNext: () => void
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    setIsAnimated(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
      {/* Animated Logo */}
      <div
        className={`mb-8 transition-all duration-1000 ${isAnimated ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center glow-effect">
            <MessageCircle size={48} className="text-white" />
          </div>
          <Sparkles size={20} className="absolute -top-2 -right-2 text-[#32CD32] animate-pulse" />
        </div>
      </div>

      {/* Welcome Text */}
      <div
        className={`mb-12 transition-all duration-1000 delay-300 ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h1 className="text-4xl font-bold font-poppins mb-4 bg-gradient-to-r from-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">
          Welcome to VibeChat
        </h1>
        <p className="text-lg font-nunito text-gray-300 leading-relaxed">
          Connect with your squad in a whole new way. Express yourself with custom reactions, share your vibes, and stay
          connected 24/7.
        </p>
      </div>

      {/* CTA Button */}
      <div
        className={`transition-all duration-1000 delay-600 ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <button onClick={onNext} className="pill-button text-white font-semibold text-lg px-8 py-4">
          Let's Get Started
        </button>
      </div>

      {/* Floating elements */}
      <div
        className="absolute top-1/4 left-8 w-4 h-4 bg-[#32CD32] rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-1/3 right-12 w-3 h-3 bg-[#9370DB] rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/4 left-16 w-2 h-2 bg-[#FF1493] rounded-full animate-bounce"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}
