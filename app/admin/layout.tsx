import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { SuperAdminSidebar } from "@/components/super-admin-sidebar"
import { SuperAdminTopbar } from "@/components/super-admin-topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["super_admin"]}>
      <div className="h-screen flex overflow-hidden">
        <SuperAdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <SuperAdminTopbar />
          <main className="flex-1 overflow-y-auto bg-background">
            <div className="container mx-auto p-6">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
