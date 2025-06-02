"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  username: string
  email: string
  avatar: string
  status: string
  isOnline: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (username: string, email: string, password: string) => Promise<boolean>
  socialLogin: (provider: string) => Promise<boolean>
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem("vibechat_token")
    if (token) {
      // Simulate API call to verify token
      setTimeout(() => {
        setUser({
          id: "1",
          username: "Alex Johnson",
          email: "alex@example.com",
          avatar: "😎",
          status: "Living my best life ✨",
          isOnline: true,
        })
        setIsLoading(false)
      }, 1000)
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: "1",
            username: "Alex Johnson",
            email,
            avatar: "😎",
            status: "Living my best life ✨",
            isOnline: true,
          }
          setUser(mockUser)
          localStorage.setItem("vibechat_token", "mock_token_123")
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 2000)
    })
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username && email && password) {
          const mockUser = {
            id: "1",
            username,
            email,
            avatar: "🚀",
            status: "New to VibeChat! 🎉",
            isOnline: true,
          }
          setUser(mockUser)
          localStorage.setItem("vibechat_token", "mock_token_123")
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 2000)
    })
  }

  const socialLogin = async (provider: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate social login
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "1",
          username: `User via ${provider}`,
          email: `user@${provider}.com`,
          avatar: provider === "google" ? "🔍" : provider === "discord" ? "🎮" : "📱",
          status: `Connected via ${provider} ✨`,
          isOnline: true,
        }
        setUser(mockUser)
        localStorage.setItem("vibechat_token", "mock_token_123")
        setIsLoading(false)
        resolve(true)
      }, 2000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("vibechat_token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        socialLogin,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
