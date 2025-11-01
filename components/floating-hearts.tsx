"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface FloatingHeart {
  id: number
  left: number
  delay: number
  duration: number
  size: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const heartArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 6,
      size: 16 + Math.random() * 24,
    }))
    setHearts(heartArray)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            color: "rgba(220, 20, 60, 0.4)",
            filter: "drop-shadow(0 0 8px rgba(220, 20, 60, 0.6))",
          }}
          size={heart.size}
          fill="rgba(220, 20, 60, 0.3)"
        />
      ))}
    </div>
  )
}
