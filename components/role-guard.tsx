"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"

interface GuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// Simplified guard: only checks authentication, no role
export function RoleGuard({ children, fallback = null }: GuardProps) {
  const { user } = useAuth()

  if (!user) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
