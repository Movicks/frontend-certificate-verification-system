"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Upload,
  FileText,
  Users,
  Settings,
} from "lucide-react"

const tabs = [
  { title: "Home", href: "/dashboard", icon: LayoutDashboard },
  { title: "Upload", href: "/dashboard/upload", icon: Upload },
  { title: "Files", href: "/dashboard/certificates", icon: FileText },
  { title: "Bulk", href: "/dashboard/certificates/bulk", icon: Users },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function AdminBottomTabs() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-sidebar border-t border-sidebar-border">
      <nav className="relative flex justify-around h-16">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/dashboard" && pathname.startsWith(tab.href))

          const Icon = tab.icon

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 relative"
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground/60",
                )}
              />
              <span
                className={cn(
                  "text-[11px] mt-1",
                  isActive
                    ? "text-sidebar-primary font-medium"
                    : "text-sidebar-foreground/60",
                )}
              >
                {tab.title}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span className="absolute top-0 h-1 w-8 rounded-full bg-sidebar-primary transition-all" />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
