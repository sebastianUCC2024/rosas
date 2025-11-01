"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { FallingPetals } from "./falling-petals"
import { FloatingHearts } from "./floating-hearts"
import { SparkleEffect } from "./sparkle-effect"
import { Heart } from "lucide-react"

const poem = [
  "En el silencio de la noche, cuando las estrellas susurran,",
  "tu nombre se escribe en el cielo con luz de luna.",
  "Eres el verso que mi alma nunca supo escribir,",
  "la melodía que mi corazón siempre quiso cantar.",
  "",
  "Como el mar que busca la orilla sin cesar,",
  "así te busco yo en cada latido, en cada respirar.",
  "Eres la calma en medio de la tormenta,",
  "el refugio donde mi espíritu se alimenta.",
  "",
  "Tus ojos guardan secretos de universos lejanos,",
  "y en tus manos encuentro el hogar que tanto he buscado.",
  "No hay distancia que pueda separar lo que sentimos,",
  "ni tiempo que borre los momentos que vivimos.",
  "",
  "Eres mi estrellita en la oscuridad más profunda,",
  "la luz que guía mi camino cuando todo se hunde.",
  "Y aunque las palabras nunca serán suficientes,",
  "quiero que sepas que eres mi siempre, mi presente.",
  "",
  "Como los girasoles que siguen al sol sin dudar,",
  "así mi alma te sigue, sin poder evitar.",
  "Eres la razón por la que creo en lo eterno,",
  "mi primavera eterna en medio del invierno.",
]

export function RomanticPage() {
  const [currentVerse, setCurrentVerse] = useState(0)
  const [showFinalMessage, setShowFinalMessage] = useState(false)

  useEffect(() => {
    if (currentVerse < poem.length) {
      const timer = setTimeout(() => {
        setCurrentVerse(currentVerse + 1)
      }, 2000) // Each verse appears after 2 seconds
      return () => clearTimeout(timer)
    } else {
      const messageTimer = setTimeout(() => {
        setShowFinalMessage(true)
      }, 1500)

      return () => {
        clearTimeout(messageTimer)
      }
    }
  }, [currentVerse])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <FallingPetals />
      <FloatingHearts />
      <SparkleEffect />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-12 flex items-center justify-center gap-4 md:mb-16"
        >
          <Heart className="animate-heart-beat text-primary" size={32} fill="currentColor" />
          <h1
            className="animate-pulse-glow text-center text-4xl font-bold text-primary md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "'Dancing Script', cursive",
              textShadow: "0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2)",
            }}
          >
            💫 Para ti, mi estrellita
          </h1>
          <Heart className="animate-heart-beat text-primary" size={32} fill="currentColor" />
        </motion.div>

        {/* Poem verses */}
        <div className="mx-auto mb-16 w-full max-w-3xl space-y-4 text-center">
          <AnimatePresence>
            {poem.slice(0, currentVerse).map((verse, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`text-pretty leading-relaxed text-foreground transition-all ${
                  verse === "" ? "h-4" : "text-lg md:text-xl lg:text-2xl"
                }`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                }}
              >
                {verse}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showFinalMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="mx-auto max-w-2xl px-4 text-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -left-8 -top-8 text-primary/30"
                >
                  <Heart size={40} fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -right-8 -top-8 text-primary/30"
                >
                  <Heart size={40} fill="currentColor" />
                </motion.div>
                <p
                  className="text-balance text-xl leading-relaxed text-primary md:text-2xl lg:text-3xl"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    textShadow: "0 0 15px rgba(255, 215, 0, 0.2)",
                  }}
                >
                  "Porque tú eres la luz que florece incluso en mis días más grises, la calma que mi alma encuentra
                  cuando todo se apaga, la flor eterna en mi jardín de sueños."
                </p>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -bottom-8 -left-8 text-primary/30"
                >
                  <Heart size={40} fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -bottom-8 -right-8 text-primary/30"
                >
                  <Heart size={40} fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
