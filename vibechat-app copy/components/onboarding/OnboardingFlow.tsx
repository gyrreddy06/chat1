"use client"

import { useState } from "react"
import WelcomeScreen from "./WelcomeScreen"
import AvatarCreation from "./AvatarCreation"
import InterestSelection from "./InterestSelection"

interface OnboardingFlowProps {
  onComplete: () => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const steps = [
    <WelcomeScreen key="welcome" onNext={nextStep} />,
    <AvatarCreation key="avatar" onNext={nextStep} />,
    <InterestSelection key="interests" onNext={nextStep} />,
  ]

  return (
    <div className="min-h-screen bg-[#121212] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E90FF]/20 via-transparent to-[#FF1493]/20" />

      {/* Progress indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {[0, 1, 2].map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              step <= currentStep ? "bg-gradient-to-r from-[#1E90FF] to-[#FF1493]" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      {steps[currentStep]}
    </div>
  )
}
