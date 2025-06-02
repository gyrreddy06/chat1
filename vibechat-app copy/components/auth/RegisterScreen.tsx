"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, MessageCircle, Mail, Lock, User } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface RegisterScreenProps {
  onSwitchToLogin: () => void
}

export default function RegisterScreen({ onSwitchToLogin }: RegisterScreenProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { register, socialLogin, isLoading } = useAuth()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const success = await register(username, email, password)
    if (!success) {
      setError("Failed to create account")
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
        <h1 className="text-3xl font-bold font-poppins mb-2 text-white">Join VibeChat!</h1>
        <p className="text-gray-400 font-nunito">Create your account and start vibing</p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4 fade-in">
        {/* Username Input */}
        <div className="relative">
          <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#2A2A2A] text-white pl-10 pr-4 py-3 rounded-xl font-nunito focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-all"
            required
          />
        </div>

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

        {/* Confirm Password Input */}
        <div className="relative">
          <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-[#2A2A2A] text-white pl-10 pr-4 py-3 rounded-xl font-nunito focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-all"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-[#FF1493] text-sm font-nunito text-center">{error}</p>}

        {/* Register Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full pill-button text-white font-semibold py-3 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
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

      {/* Sign In Link */}
      <div className="mt-8 text-center fade-in">
        <p className="text-gray-400 font-nunito">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-[#1E90FF] hover:text-[#FF1493] transition-colors font-semibold"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}
