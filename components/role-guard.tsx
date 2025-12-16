"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import type { UserRole } from "@/types/auth"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallback?: React.ReactNode
}

export function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
