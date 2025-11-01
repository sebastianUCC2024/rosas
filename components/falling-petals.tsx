"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
}

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8,
      size: 20 + Math.random() * 20,
      rotation: Math.random() * 360,
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ height: "100vh", minHeight: "100vh" }}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: "-10%",
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, Math.sin(petal.id) * 50, 0],
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0, 1, 1, 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 100 100"
            style={{
              filter: "drop-shadow(0 0 8px rgba(220, 20, 60, 0.6))",
            }}
          >
            {/* Rose petals */}
            <ellipse cx="50" cy="50" rx="25" ry="35" fill="#DC143C" opacity="0.9" />
            <ellipse cx="35" cy="45" rx="20" ry="30" fill="#C41E3A" opacity="0.8" />
            <ellipse cx="65" cy="45" rx="20" ry="30" fill="#C41E3A" opacity="0.8" />
            <ellipse cx="50" cy="35" rx="18" ry="25" fill="#E63946" opacity="0.9" />
            <ellipse cx="50" cy="55" rx="15" ry="20" fill="#A01729" opacity="0.7" />
            {/* Center of rose */}
            <circle cx="50" cy="50" r="8" fill="#8B0000" opacity="0.9" />
          </svg>
        </motion.div>
      ))}

      {/* Add some sparkles/stars */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div
            className="h-1 w-1 rounded-full bg-primary"
            style={{
              boxShadow: "0 0 8px rgba(255, 215, 0, 0.8)",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
