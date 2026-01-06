import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminTopbar } from "@/components/admin-topbar"
import {AdminBottomTabs} from "../../components/AdminBottomTabs"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireApproval={true}>
      <div className="max-h-screen h-full flex overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopbar />
          <main className="flex-1 overflow-y-auto bg-background pb-14">
            <div className="container mx-auto p-6">{children}</div>
          </main>
        </div>
        <AdminBottomTabs/>
      </div>
    </AuthGuard>
  )
}
