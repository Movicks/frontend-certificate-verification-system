"use client"

import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminTopbar } from "@/components/admin-topbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["institution_admin"]} requireApproval={true}>
      <div className="h-screen flex overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopbar />
          <main className="flex-1 overflow-y-auto bg-background">
            <div className="container mx-auto p-6">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
