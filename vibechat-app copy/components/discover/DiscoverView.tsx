"use client"

import { useState } from "react"
import { Search, TrendingUp, Users, Hash } from "lucide-react"

export default function DiscoverView() {
  const [activeFilter, setActiveFilter] = useState("trending")

  const trendingTopics = [
    { tag: "#VibeCheck", posts: "2.3K", color: "from-[#1E90FF] to-[#9370DB]" },
    { tag: "#StudyWithMe", posts: "1.8K", color: "from-[#FF1493] to-[#32CD32]" },
    { tag: "#GameNight", posts: "1.2K", color: "from-[#32CD32] to-[#1E90FF]" },
    { tag: "#MoodBoard", posts: "956", color: "from-[#9370DB] to-[#FF1493]" },
    { tag: "#LatNightThoughts", posts: "743", color: "from-[#FF1493] to-[#1E90FF]" },
  ]

  const suggestedGroups = [
    {
      id: 1,
      name: "Coffee Lovers ☕",
      members: "12.5K",
      description: "Share your favorite coffee spots and brewing tips",
      avatar: "☕",
      isJoined: false,
    },
    {
      id: 2,
      name: "Night Owls 🦉",
      members: "8.9K",
      description: "For those who thrive in the midnight hours",
      avatar: "🦉",
      isJoined: true,
    },
    {
      id: 3,
      name: "Creative Minds 🎨",
      members: "15.2K",
      description: "Artists, designers, and creative souls unite",
      avatar: "🎨",
      isJoined: false,
    },
    {
      id: 4,
      name: "Fitness Fam 💪",
      members: "6.7K",
      description: "Motivation, workouts, and healthy living",
      avatar: "💪",
      isJoined: false,
    },
  ]

  const nearbyUsers = [
    {
      id: 1,
      name: "Jordan Lee",
      avatar: "🌟",
      distance: "0.5 km",
      interests: ["Music", "Art", "Coffee"],
      mutualFriends: 3,
    },
    {
      id: 2,
      name: "Taylor Swift",
      avatar: "🎵",
      distance: "1.2 km",
      interests: ["Gaming", "Movies", "Food"],
      mutualFriends: 7,
    },
    {
      id: 3,
      name: "Casey Park",
      avatar: "📸",
      distance: "2.1 km",
      interests: ["Photography", "Travel", "Books"],
      mutualFriends: 2,
    },
  ]

  const filters = [
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "groups", label: "Groups", icon: Users },
    { id: "nearby", label: "Nearby", icon: Hash },
  ]

  const renderContent = () => {
    switch (activeFilter) {
      case "trending":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold font-poppins text-white">Trending Topics</h2>
            {trendingTopics.map((topic, index) => (
              <div key={index} className="bg-[#1E1E1E] rounded-xl p-4 fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`font-bold font-poppins text-lg bg-gradient-to-r ${topic.color} bg-clip-text text-transparent`}
                    >
                      {topic.tag}
                    </h3>
                    <p className="text-gray-400 font-nunito text-sm">{topic.posts} posts</p>
                  </div>
                  <button className="pill-button text-white text-sm px-4 py-2">Join</button>
                </div>
              </div>
            ))}
          </div>
        )

      case "groups":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold font-poppins text-white">Suggested Groups</h2>
            {suggestedGroups.map((group) => (
              <div key={group.id} className="bg-[#1E1E1E] rounded-xl p-4 fade-in">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center text-xl">
                    {group.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold font-poppins text-white">{group.name}</h3>
                      <button
                        className={`px-4 py-1 rounded-full text-sm font-nunito transition-all ${
                          group.isJoined
                            ? "bg-[#2A2A2A] text-gray-400"
                            : "bg-gradient-to-r from-[#1E90FF] to-[#FF1493] text-white hover:scale-105"
                        }`}
                      >
                        {group.isJoined ? "Joined" : "Join"}
                      </button>
                    </div>
                    <p className="text-gray-400 font-nunito text-sm mb-2">{group.description}</p>
                    <p className="text-xs text-gray-500 font-nunito">{group.members} members</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      case "nearby":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold font-poppins text-white">People Nearby</h2>
            {nearbyUsers.map((user) => (
              <div key={user.id} className="bg-[#1E1E1E] rounded-xl p-4 fade-in">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold font-poppins text-white">{user.name}</h3>
                      <button className="pill-button text-white text-sm px-4 py-1">Connect</button>
                    </div>
                    <p className="text-gray-400 font-nunito text-sm mb-2">{user.distance} away</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {user.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-[#2A2A2A] text-gray-300 px-2 py-1 rounded-full text-xs font-nunito"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 font-nunito">{user.mutualFriends} mutual friends</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#121212]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#2A2A2A]">
        <h1 className="text-2xl font-bold font-poppins text-white mb-4">Discover</h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search people, groups, topics..."
            className="w-full bg-[#2A2A2A] text-white pl-10 pr-4 py-3 rounded-xl font-nunito focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-[#2A2A2A] rounded-xl p-1">
          {filters.map((filter) => {
            const Icon = filter.icon
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-[#1E90FF] to-[#FF1493] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span className="font-nunito text-sm">{filter.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">{renderContent()}</div>
    </div>
  )
}
