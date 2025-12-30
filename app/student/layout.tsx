import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { StudentSidebar } from "@/components/student-sidebar"
import { StudentTopbar } from "@/components/student-topbar"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={["student"]}>
      <div className="h-screen flex overflow-hidden">
        <StudentSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <StudentTopbar />
          <main className="flex-1 overflow-y-auto bg-background">
            <div className="container mx-auto p-6">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
