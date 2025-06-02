"use client"

import { useState } from "react"
import { Settings, Edit3, Palette, Shield, Bell, Moon } from "lucide-react"

export default function ProfileView() {
  const [selectedTheme, setSelectedTheme] = useState("dark")

  const themes = [
    { id: "dark", name: "Dark Vibes", colors: ["#121212", "#1E90FF", "#FF1493"] },
    { id: "neon", name: "Neon Dreams", colors: ["#0a0a0a", "#32CD32", "#9370DB"] },
    { id: "sunset", name: "Sunset Glow", colors: ["#1a1a1a", "#FF6B35", "#F7931E"] },
    { id: "ocean", name: "Ocean Breeze", colors: ["#0f1419", "#00CED1", "#4169E1"] },
  ]

  const stats = [
    { label: "Messages", value: "2.4K" },
    { label: "Friends", value: "156" },
    { label: "Groups", value: "12" },
  ]

  const settingsOptions = [
    { icon: Bell, label: "Notifications", description: "Manage your notification preferences" },
    { icon: Shield, label: "Privacy & Security", description: "Control who can see your content" },
    { icon: Palette, label: "Themes & Appearance", description: "Customize your app experience" },
    { icon: Moon, label: "Dark Mode", description: "Always on for the perfect vibe" },
  ]

  return (
    <div className="flex flex-col h-screen bg-[#121212]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#2A2A2A]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-poppins text-white">Profile</h1>
          <button className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="px-6 py-6 text-center border-b border-[#2A2A2A]">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center text-3xl glow-effect">
              😎
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#FF1493] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Edit3 size={14} className="text-white" />
            </button>
          </div>

          <h2 className="text-xl font-bold font-poppins text-white mb-1">Alex Johnson</h2>
          <p className="text-gray-400 font-nunito mb-4">Living my best life ✨</p>

          {/* Stats */}
          <div className="flex justify-center space-x-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-lg font-bold font-poppins text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 font-nunito">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Selector */}
        <div className="px-6 py-6 border-b border-[#2A2A2A]">
          <h3 className="text-lg font-semibold font-poppins text-white mb-4">Choose Your Vibe</h3>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  selectedTheme === theme.id
                    ? "border-[#1E90FF] glow-effect"
                    : "border-[#2A2A2A] hover:border-[#3A3A3A]"
                }`}
              >
                <div className="flex space-x-1 mb-2">
                  {theme.colors.map((color, index) => (
                    <div key={index} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <p className="text-sm font-nunito text-white">{theme.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Stickers */}
        <div className="px-6 py-6 border-b border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold font-poppins text-white">My Stickers</h3>
            <button className="pill-button text-white text-sm px-4 py-2">Create New</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {["🔥", "💯", "✨", "🚀", "💫", "⚡", "🌟", "💎"].map((sticker, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-[#2A2A2A] rounded-xl flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer"
              >
                {sticker}
              </div>
            ))}
          </div>
        </div>

        {/* Mood Status */}
        <div className="px-6 py-6 border-b border-[#2A2A2A]">
          <h3 className="text-lg font-semibold font-poppins text-white mb-4">Current Mood</h3>
          <div className="flex items-center space-x-3 bg-[#1E1E1E] rounded-xl p-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#32CD32] to-[#1E90FF] rounded-full flex items-center justify-center text-xl">
              😊
            </div>
            <div className="flex-1">
              <p className="font-semibold font-poppins text-white">Feeling Creative</p>
              <p className="text-sm text-gray-400 font-nunito">Working on some new designs</p>
            </div>
            <button className="text-[#1E90FF] font-nunito text-sm">Change</button>
          </div>
        </div>

        {/* Settings */}
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold font-poppins text-white mb-4">Settings</h3>
          <div className="space-y-3">
            {settingsOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <button
                  key={index}
                  className="w-full flex items-center space-x-3 p-3 bg-[#1E1E1E] rounded-xl hover:bg-[#2A2A2A] transition-colors"
                >
                  <Icon size={20} className="text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold font-poppins text-white">{option.label}</p>
                    <p className="text-sm text-gray-400 font-nunito">{option.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
