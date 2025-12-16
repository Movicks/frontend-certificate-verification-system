"use client"

import { useRequireAuth } from "@/hooks/use-auth"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Clock, FileCheck, Users, TrendingUp } from "lucide-react"
import { AnimatedContainer } from "@/components/animated-container"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { superAdminAPI } from "@/lib/api/super-admin-api"

export default function SuperAdminDashboardPage() {
  const user = useRequireAuth(["super_admin"]) // restrict to super admin
  if (!user) return null
  const { data: stats, isLoading } = useQuery({
    queryKey: ["superadmin", "stats"],
    queryFn: superAdminAPI.getSystemStats,
  })

  const statCards = [
    {
      title: "Total Institutions",
      value: stats?.totalInstitutions || 0,
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Pending Approvals",
      value: stats?.pendingApprovals || 0,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Total Certificates",
      value: stats?.totalCertificates || 0,
      icon: FileCheck,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      icon: Users,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      title: "Recent Activity",
      value: stats?.recentActivity || 0,
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">System-wide overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <LoadingSkeleton key={i} variant="card" />)
          : statCards.map((stat, index) => (
              <AnimatedContainer key={stat.title} delay={index * 0.05}>
                <Card className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value.toLocaleString()}</div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
      </div>

      {/* Quick Actions */}
      <AnimatedContainer delay={0.3}>
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/admin/institutions?filter=pending" className="group">
                <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-warning" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">Review Pending</h3>
                        <p className="text-sm text-muted-foreground">{stats?.pendingApprovals || 0} institutions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a href="/admin/institutions" className="group">
                <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">All Institutions</h3>
                        <p className="text-sm text-muted-foreground">Manage institutions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a href="/admin/audit-logs" className="group">
                <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-info" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">View Activity</h3>
                        <p className="text-sm text-muted-foreground">System audit logs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  )
}
