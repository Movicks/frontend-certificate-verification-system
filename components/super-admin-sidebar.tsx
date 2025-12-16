"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Building2, FileText, Shield, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Institutions",
    href: "/admin/institutions",
    icon: Building2,
  },
  {
    title: "Audit Logs",
    href: "/admin/audit-logs",
    icon: FileText,
  },
]

export function SuperAdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-sidebar-primary" />
            <span className="font-semibold text-sidebar-foreground">SCVS Super Admin</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="ml-auto">
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-sidebar-border">
          <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
          <p className="text-xs text-sidebar-foreground/60 truncate">{user.email}</p>
          <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
            Super Admin
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sidebar-foreground",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/50",
                  isCollapsed && "justify-center",
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm">{item.title}</span>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsed && "justify-center",
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
