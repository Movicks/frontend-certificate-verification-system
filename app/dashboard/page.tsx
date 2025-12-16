"use client"

import { useRequireAuth } from "@/hooks/use-auth"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { certificatesAPI } from "@/lib/api/certificates-api"
import { FileCheck, Shield, XCircle, Eye, TrendingUp, Calendar } from "lucide-react"
import { CertificateCard } from "@/components/certificate-card"
import { AnimatedContainer } from "@/components/animated-container"
import { LoadingSkeleton } from "@/components/loading-skeleton"

export default function InstitutionAdminDashboardPage() {
  const user = useRequireAuth(["institution_admin"]) // restrict to institution admin
  if (!user) return null

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: certificatesAPI.getDashboardStats,
  })

  const { data: certificates, isLoading: certsLoading } = useQuery({
    queryKey: ["certificates", "recent"],
    queryFn: () => certificatesAPI.getCertificates(),
  })

  const statCards = [
    {
      title: "Total Certificates",
      value: stats?.totalCertificates || 0,
      icon: FileCheck,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active",
      value: stats?.activeCertificates || 0,
      icon: Shield,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Revoked",
      value: stats?.revokedCertificates || 0,
      icon: XCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Total Scans",
      value: stats?.totalScans || 0,
      icon: Eye,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      title: "Recent Verifications",
      value: stats?.recentVerifications || 0,
      icon: TrendingUp,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "This Month",
      value: stats?.certificatesThisMonth || 0,
      icon: Calendar,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  const recentCertificates = certificates?.slice(0, 6) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your certificate management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsLoading
          ? Array.from({ length: 6 }).map((_, i) => <LoadingSkeleton key={i} variant="card" />)
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

      {/* Recent Certificates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Certificates</h2>
        </div>

        {certsLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <LoadingSkeleton key={i} variant="card" />
            ))}
          </div>
        ) : recentCertificates.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recentCertificates.map((cert, index) => (
              <AnimatedContainer key={cert.id} delay={index * 0.05}>
                <CertificateCard certificate={cert} />
              </AnimatedContainer>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FileCheck className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
              <p className="text-sm text-muted-foreground">Get started by issuing your first certificate</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
