"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, MessageCircle, Mail, Lock } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface LoginScreenProps {
  onSwitchToRegister: () => void
}

export default function LoginScreen({ onSwitchToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, socialLogin, isLoading } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (!success) {
      setError("Invalid email or password")
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setError("")
    const success = await socialLogin(provider)
    if (!success) {
      setError(`Failed to login with ${provider}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8">
      {/* Logo */}
      <div className="mb-8 fade-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#1E90FF] to-[#FF1493] flex items-center justify-center glow-effect">
          <MessageCircle size={40} className="text-white" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="text-center mb-8 fade-in">
        <h1 className="text-3xl font-bold font-poppins mb-2 text-white">Welcome Back!</h1>
        <p className="text-gray-400 font-nunito">Sign in to continue your vibe</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 fade-in">
        {/* Email Input */}
        <div className="relative">
          <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#2A2A2A] text-white pl-10 pr-4 py-3 rounded-xl font-nunito focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-all"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#2A2A2A] text-white pl-10 pr-12 py-3 rounded-xl font-nunito focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-[#FF1493] text-sm font-nunito text-center">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full pill-button text-white font-semibold py-3 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Social Login */}
      <div className="w-full max-w-sm mt-6 fade-in">
        <div className="flex items-center mb-4">
          <div className="flex-1 h-px bg-[#2A2A2A]" />
          <span className="px-4 text-gray-400 font-nunito text-sm">or continue with</span>
          <div className="flex-1 h-px bg-[#2A2A2A]" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
            className="bg-[#2A2A2A] hover:bg-[#3A3A3A] p-3 rounded-xl transition-colors flex items-center justify-center"
          >
            <span className="text-xl">🔍</span>
          </button>
          <button
            onClick={() => handleSocialLogin("discord")}
            disabled={isLoading}
            className="bg-[#2A2A2A] hover:bg-[#3A3A3A] p-3 rounded-xl transition-colors flex items-center justify-center"
          >
            <span className="text-xl">🎮</span>
          </button>
          <button
            onClick={() => handleSocialLogin("apple")}
            disabled={isLoading}
            className="bg-[#2A2A2A] hover:bg-[#3A3A3A] p-3 rounded-xl transition-colors flex items-center justify-center"
          >
            <span className="text-xl">🍎</span>
          </button>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="mt-8 text-center fade-in">
        <p className="text-gray-400 font-nunito">
          New to VibeChat?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-[#1E90FF] hover:text-[#FF1493] transition-colors font-semibold"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  )
}
