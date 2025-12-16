"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import type { UserRole } from "@/types/auth"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  requireApproval?: boolean
}

export function AuthGuard({ children, allowedRoles, requireApproval = false }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated - redirect to login
      if (!user) {
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
        return
      }

      // Check role authorization
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/")
        return
      }

      // Check institution approval status
      if (requireApproval && user.role === "institution_admin") {
        if (user.institution?.status === "pending" && !pathname.includes("pending-approval")) {
          router.push("/dashboard/pending-approval")
          return
        }
        if (user.institution?.status !== "pending" && pathname.includes("pending-approval")) {
          router.push("/dashboard")
          return
        }
      }
    }
  }, [user, isLoading, allowedRoles, requireApproval, router, pathname])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Not authorized
  if (!user) {
    return null
  }

  // Role check failed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null
  }

  // All checks passed - render children
  return <>{children}</>
}
