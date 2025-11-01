"use client"

import { motion } from "framer-motion"

export function SingleRose() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Rose stem */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 h-48 w-2 origin-bottom -translate-x-1/2 rounded-full"
        style={{
          background: "linear-gradient(to bottom, rgb(34, 139, 34), rgb(22, 101, 22))",
        }}
      />

      {/* Rose bloom */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="relative z-10"
      >
        <RoseBloom />
      </motion.div>

      {/* Falling petals from rose */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`rose-petal-${i}`}
          className="absolute"
          style={{
            left: "50%",
            top: "20%",
          }}
          animate={{
            y: [0, 150 + Math.random() * 100],
            x: [(Math.random() - 0.5) * 120, (Math.random() - 0.5) * 180],
            rotate: [0, Math.random() * 720],
            opacity: [1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: 2 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 4,
          }}
        >
          <div
            className="h-3 w-2 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgb(220, 38, 38), rgb(185, 28, 28))",
              boxShadow: "0 0 10px rgba(220, 38, 38, 0.6)",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

function RoseBloom() {
  const outerPetals = 8
  const middlePetals = 6
  const innerPetals = 4

  return (
    <div className="relative h-32 w-32">
      {/* Outer petals layer */}
      {Array.from({ length: outerPetals }).map((_, i) => {
        const angle = (i * 360) / outerPetals
        return (
          <motion.div
            key={`outer-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              width: "40px",
              height: "50px",
            }}
          >
            <div
              className="h-full w-full rounded-t-full"
              style={{
                background: "linear-gradient(to top, rgb(185, 28, 28), rgb(220, 38, 38))",
                boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)",
              }}
            />
          </motion.div>
        )
      })}

      {/* Middle petals layer */}
      {Array.from({ length: middlePetals }).map((_, i) => {
        const angle = (i * 360) / middlePetals + 30
        return (
          <motion.div
            key={`middle-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              width: "32px",
              height: "40px",
            }}
          >
            <div
              className="h-full w-full rounded-t-full"
              style={{
                background: "linear-gradient(to top, rgb(220, 38, 38), rgb(239, 68, 68))",
                boxShadow: "0 0 12px rgba(239, 68, 68, 0.5)",
              }}
            />
          </motion.div>
        )
      })}

      {/* Inner petals layer */}
      {Array.from({ length: innerPetals }).map((_, i) => {
        const angle = (i * 360) / innerPetals + 45
        return (
          <motion.div
            key={`inner-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 + i * 0.08 }}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              width: "24px",
              height: "30px",
            }}
          >
            <div
              className="h-full w-full rounded-t-full"
              style={{
                background: "linear-gradient(to top, rgb(239, 68, 68), rgb(248, 113, 113))",
                boxShadow: "0 0 10px rgba(248, 113, 113, 0.6)",
              }}
            />
          </motion.div>
        )
      })}

      {/* Center of rose */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "20px",
          height: "20px",
          background: "radial-gradient(circle, rgb(153, 27, 27), rgb(127, 29, 29))",
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(220, 38, 38, 0.6)",
        }}
      />
    </div>
  )
}
