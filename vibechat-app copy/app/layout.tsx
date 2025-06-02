import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { SocketProvider } from "@/contexts/SocketContext"
import { NotificationProvider } from "@/contexts/NotificationContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "VibeChat - Gen-Z Messaging App",
  description: "A modern messaging app designed for Gen-Z with real-time features",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
