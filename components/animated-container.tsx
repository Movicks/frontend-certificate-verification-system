"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedContainerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  delay?: number
}

export function AnimatedContainer({ children, delay = 0, ...props }: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, delay = 0, ...props }: AnimatedContainerProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay }} {...props}>
      {children}
    </motion.div>
  )
}

export function SlideIn({
  children,
  delay = 0,
  direction = "left",
  ...props
}: AnimatedContainerProps & { direction?: "left" | "right" | "up" | "down" }) {
  const variants = {
    left: { x: -50 },
    right: { x: 50 },
    up: { y: -50 },
    down: { y: 50 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...variants[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
