"use client"

import { useAuth } from "@/contexts/AuthContext"
import MainApp from "@/components/MainApp"
import AuthFlow from "@/components/auth/AuthFlow"
import LoadingScreen from "@/components/LoadingScreen"

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <AuthFlow />
  }

  return <MainApp />
}
