"use client"

import { useState } from "react"
import LoginScreen from "./LoginScreen"
import RegisterScreen from "./RegisterScreen"

export default function AuthFlow() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "register">("login")

  return (
    <div className="min-h-screen bg-[#121212] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E90FF]/20 via-transparent to-[#FF1493]/20" />

      {currentScreen === "login" ? (
        <LoginScreen onSwitchToRegister={() => setCurrentScreen("register")} />
      ) : (
        <RegisterScreen onSwitchToLogin={() => setCurrentScreen("login")} />
      )}
    </div>
  )
}
