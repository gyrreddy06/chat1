"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, MicOff, Send, X, Play, Pause } from "lucide-react"

interface VoiceRecorderProps {
  onClose: () => void
  onSendVoice: (audioBlob: Blob, duration: number, waveform: number[]) => void
}

export default function VoiceRecorder({ onClose, onSendVoice }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [waveform, setWaveform] = useState<number[]>([])
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Setup audio context for waveform visualization
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      analyserRef.current.fftSize = 256
      const bufferLength = analyserRef.current.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      // Setup media recorder
      mediaRecorderRef.current = new MediaRecorder(stream)
      const chunks: Blob[] = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setDuration(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 0.1)
      }, 100)

      // Start waveform visualization
      const updateWaveform = () => {
        if (analyserRef.current && isRecording) {
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / bufferLength
          const normalizedValue = average / 255

          setWaveform((prev) => [...prev.slice(-50), normalizedValue])
          animationFrameRef.current = requestAnimationFrame(updateWaveform)
        }
      }
      updateWaveform()
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Could not access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) clearInterval(timerRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const sendVoiceMessage = () => {
    if (audioBlob) {
      onSendVoice(audioBlob, Math.round(duration * 10) / 10, waveform)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 fade-in">
      <div className="bg-[#1E1E1E] rounded-2xl p-6 m-4 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold font-poppins text-white">Voice Message</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#2A2A2A] rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Waveform Visualization */}
        <div className="bg-[#2A2A2A] rounded-xl p-4 mb-6 h-24 flex items-center justify-center">
          {waveform.length > 0 ? (
            <div className="flex items-center space-x-1 h-full">
              {waveform.slice(-30).map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-[#1E90FF] to-[#FF1493] rounded-full transition-all duration-100"
                  style={{
                    width: "3px",
                    height: `${Math.max(4, value * 60)}px`,
                    opacity: isRecording ? 1 : 0.7,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 font-nunito text-sm">{isRecording ? "Recording..." : "Tap record to start"}</p>
          )}
        </div>

        {/* Duration */}
        <div className="text-center mb-6">
          <p className="text-xl font-bold font-poppins text-white">{formatDuration(duration)}</p>
          <p className="text-sm text-gray-400 font-nunito">
            {duration >= 120 ? "Max duration reached" : "Max 2 minutes"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          {!audioBlob ? (
            // Recording controls
            <>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:bg-[#3A3A3A] transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={duration >= 120}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? "bg-[#FF1493] hover:bg-[#FF1493]/80 scale-110"
                    : "bg-gradient-to-r from-[#1E90FF] to-[#FF1493] hover:scale-105"
                }`}
              >
                {isRecording ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
              </button>
              <div className="w-12 h-12" /> {/* Spacer */}
            </>
          ) : (
            // Playback controls
            <>
              <button
                onClick={() => {
                  setAudioBlob(null)
                  setAudioUrl(null)
                  setWaveform([])
                  setDuration(0)
                }}
                className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:bg-[#3A3A3A] transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>

              <button
                onClick={togglePlayback}
                className="w-16 h-16 bg-gradient-to-r from-[#1E90FF] to-[#FF1493] rounded-full flex items-center justify-center hover:scale-105 transition-all"
              >
                {isPlaying ? (
                  <Pause size={24} className="text-white" />
                ) : (
                  <Play size={24} className="text-white ml-1" />
                )}
              </button>

              <button
                onClick={sendVoiceMessage}
                className="w-12 h-12 bg-[#32CD32] rounded-full flex items-center justify-center hover:scale-105 transition-all"
              >
                <Send size={20} className="text-white" />
              </button>
            </>
          )}
        </div>

        {/* Hidden audio element for playback */}
        {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />}
      </div>
    </div>
  )
}
