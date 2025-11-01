"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

interface Sparkle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  size: number
}

export function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const sparkleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 2,
      size: 12 + Math.random() * 12,
    }))
    setSparkles(sparkleArray)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {sparkles.map((sparkle) => (
        <Sparkles
          key={sparkle.id}
          className="absolute animate-twinkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            color: "rgba(255, 215, 0, 0.5)",
            filter: "drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))",
          }}
          size={sparkle.size}
        />
      ))}
    </div>
  )
}
