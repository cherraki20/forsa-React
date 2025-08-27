"use client"

import { useEffect } from "react"
import Hero from "../components/Hero"
import Features from "../components/Features"
import CTA from "../components/CTA"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

function Home() {
  const { observeElements } = useScrollAnimation()

  useEffect(() => {
    document.title = "ForsaFinder - Connecter les Étudiants aux Opportunités"
    observeElements()
  }, [observeElements])

  return (
    <>
      <Hero />
      <Features />
      <CTA />
    </>
  )
}

export default Home
