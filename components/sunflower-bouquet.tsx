"use client"

import { motion } from "framer-motion"

export function SunflowerBouquet() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Main sunflowers */}
      <div className="relative">
        {/* Center sunflower */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <Sunflower size={120} delay={0} />
        </motion.div>

        {/* Left sunflower */}
        <motion.div
          initial={{ scale: 0, rotate: -180, x: 0, y: 0 }}
          animate={{ scale: 0.85, rotate: 0, x: -60, y: 20 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute left-0 top-0"
        >
          <Sunflower size={100} delay={0.3} />
        </motion.div>

        {/* Right sunflower */}
        <motion.div
          initial={{ scale: 0, rotate: -180, x: 0, y: 0 }}
          animate={{ scale: 0.85, rotate: 0, x: 60, y: 20 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute right-0 top-0"
        >
          <Sunflower size={100} delay={0.3} />
        </motion.div>

        {/* Small white flowers around */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8
          const radius = 100
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <SmallFlower />
            </motion.div>
          )
        })}
      </div>

      {/* Falling petals from bouquet */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`bouquet-petal-${i}`}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            y: [0, 100 + Math.random() * 50],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 150],
            rotate: [0, Math.random() * 360],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: 1 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          <div
            className="h-2 w-2 rounded-full bg-primary/60"
            style={{
              boxShadow: "0 0 8px rgba(255, 215, 0, 0.6)",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

function Sunflower({ size, delay }: { size: number; delay: number }) {
  const petalCount = 12

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Petals */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + i * 0.05 }}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              width: size * 0.3,
              height: size * 0.4,
            }}
          >
            <div
              className="h-full w-full rounded-t-full"
              style={{
                background: "linear-gradient(to top, rgb(234, 179, 8), rgb(250, 204, 21))",
                boxShadow: "0 0 10px rgba(234, 179, 8, 0.5)",
              }}
            />
          </motion.div>
        )
      })}

      {/* Center */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.35,
          height: size * 0.35,
          background: "radial-gradient(circle, rgb(120, 53, 15), rgb(92, 40, 10))",
          boxShadow: "inset 0 0 15px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Seeds pattern */}
        {Array.from({ length: 20 }).map((_, i) => {
          const seedAngle = (i * 137.5 * Math.PI) / 180 // Golden angle
          const seedRadius = size * 0.12 * Math.sqrt(i)
          const x = Math.cos(seedAngle) * seedRadius
          const y = Math.sin(seedAngle) * seedRadius

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-amber-900/60"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            />
          )
        })}
      </motion.div>
    </div>
  )
}

function SmallFlower() {
  return (
    <div className="relative h-4 w-4">
      {/* 5 small petals */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * 360) / 5
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              width: "6px",
              height: "8px",
            }}
          >
            <div
              className="h-full w-full rounded-t-full bg-white/90"
              style={{
                boxShadow: "0 0 4px rgba(255, 255, 255, 0.6)",
              }}
            />
          </div>
        )
      })}

      {/* Center */}
      <div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "rgb(250, 204, 21)",
          boxShadow: "0 0 4px rgba(250, 204, 21, 0.6)",
        }}
      />
    </div>
  )
}
