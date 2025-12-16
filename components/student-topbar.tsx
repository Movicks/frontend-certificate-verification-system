"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export function StudentTopbar() {
  const { user } = useAuth()

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold">Welcome back, {user?.name?.split(" ")[0]}</h2>
        <p className="text-xs text-muted-foreground">View and manage your certificates</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
