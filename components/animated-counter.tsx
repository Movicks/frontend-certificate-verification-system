"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number // ms
  className?: string
}

export default function AnimatedCounter({ value, duration = 1200, className }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0)
  const startTs = useRef<number | null>(null)
  const startVal = useRef(0)

  useEffect(() => {
    startTs.current = null
    startVal.current = 0

    let raf = 0
    const step = (ts: number) => {
      if (!startTs.current) startTs.current = ts
      const progress = Math.min((ts - startTs.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      const nextVal = Math.round(startVal.current + (value - startVal.current) * eased)
      setDisplay(nextVal)
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <span className={className}>{display.toLocaleString()}</span>
}