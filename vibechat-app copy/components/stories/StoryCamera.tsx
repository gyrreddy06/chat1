"use client"

import { useState, useRef, useEffect } from "react"
import { RotateCcw, X, Circle, Sparkles, Type } from "lucide-react"

interface StoryCameraProps {
  onClose: () => void
}

export default function StoryCamera({ onClose }: StoryCameraProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [showText, setShowText] = useState(false)
  const [textContent, setTextContent] = useState("")
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const filters = [
    { name: "None", style: {} },
    { name: "Retro", style: { filter: "sepia(0.8) contrast(1.2) brightness(1.1)" } },
    { name: "Cool", style: { filter: "hue-rotate(180deg) contrast(1.1)" } },
    { name: "Warm", style: { filter: "sepia(0.3) hue-rotate(15deg) saturate(1.2)" } },
    { name: "B&W", style: { filter: "grayscale(1) contrast(1.2)" } },
    { name: "Neon", style: { filter: "contrast(1.5) brightness(1.2) saturate(2)" } },
  ]

  const textColors = ["#FFFFFF", "#FF1493", "#1E90FF", "#32CD32", "#9370DB", "#FFD700", "#FF6347", "#00CED1"]

  useEffect(() => {
    startCamera()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [facingMode])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Could not access camera. Please check permissions.")
    }
  }

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current
    const context = canvas.getContext("2d")

    if (context) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Apply filter
      context.filter = filters[selectedFilter].style.filter || "none"
      context.drawImage(video, 0, 0)

      // Add text overlay if present
      if (textContent) {
        context.filter = "none"
        context.font = "bold 48px Poppins"
        context.fillStyle = textColor
        context.strokeStyle = "#000000"
        context.lineWidth = 2
        context.textAlign = "center"
        context.strokeText(textContent, canvas.width / 2, canvas.height / 2)
        context.fillText(textContent, canvas.width / 2, canvas.height / 2)
      }

      // Convert to blob and handle story creation
      canvas.toBlob((blob) => {
        if (blob) {
          console.log("Story photo captured:", blob)
          // Here you would typically upload the story
          onClose()
        }
      })
    }
  }

  const startVideoRecording = () => {
    if (!streamRef.current) return

    setIsRecording(true)

    // Simulate video recording (in a real app, you'd use MediaRecorder)
    setTimeout(() => {
      setIsRecording(false)
      console.log("Story video recorded")
      onClose()
    }, 5000) // Auto-stop after 5 seconds for demo
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Video Preview */}
      <div className="relative flex-1 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={filters[selectedFilter].style}
          autoPlay
          playsInline
          muted
        />

        {/* Text Overlay */}
        {textContent && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: textColor }}
          >
            <span className="text-4xl font-bold font-poppins text-center px-4 drop-shadow-lg">{textContent}</span>
          </div>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 px-3 py-1 rounded-full">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-white font-nunito text-sm">REC</span>
          </div>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={switchCamera}
            className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <RotateCcw size={20} className="text-white" />
          </button>

          <button
            onClick={onClose}
            className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Side Controls */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Sparkles size={20} className="text-white" />
          </button>

          <button
            onClick={() => setShowText(!showText)}
            className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Type size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Filter Selector */}
      {showFilters && (
        <div className="absolute bottom-32 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
          <div className="flex space-x-4 overflow-x-auto">
            {filters.map((filter, index) => (
              <button
                key={index}
                onClick={() => setSelectedFilter(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-nunito text-sm transition-all ${
                  selectedFilter === index ? "bg-white text-black" : "bg-white/20 text-white"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Text Input */}
      {showText && (
        <div className="absolute bottom-32 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Add text to your story..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full bg-white/20 text-white placeholder-white/70 px-4 py-3 rounded-xl font-nunito focus:outline-none focus:ring-2 focus:ring-white/50"
            />

            <div className="flex space-x-2">
              {textColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setTextColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    textColor === color ? "border-white" : "border-white/30"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="bg-black p-6">
        <div className="flex items-center justify-center space-x-8">
          <div className="w-16" /> {/* Spacer */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={isRecording ? undefined : capturePhoto}
              onMouseDown={startVideoRecording}
              className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                isRecording ? "bg-red-500 scale-110" : "bg-transparent hover:scale-105"
              }`}
            >
              {isRecording ? (
                <div className="w-6 h-6 bg-white rounded-sm" />
              ) : (
                <Circle size={32} className="text-white fill-white" />
              )}
            </button>
            <p className="text-white font-nunito text-xs">
              {isRecording ? "Recording..." : "Tap for photo, hold for video"}
            </p>
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
