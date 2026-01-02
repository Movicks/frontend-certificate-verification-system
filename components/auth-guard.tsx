"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireApproval?: boolean
}

export function AuthGuard({ children, requireApproval = false }: AuthGuardProps) {
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

      // Role authorization removed: client no longer relies on user.role
      // Check institution approval status (when institution context exists)
      if (requireApproval && user?.institution) {
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
  }, [user, isLoading, requireApproval, router, pathname])

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

  // All checks passed - render children
  return <>{children}</>
}
