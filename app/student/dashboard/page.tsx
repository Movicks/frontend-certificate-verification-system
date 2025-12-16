"use client"

import { useRequireAuth } from "@/hooks/use-auth"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileCheck, Download, ExternalLink, Award } from "lucide-react"
import { AnimatedContainer } from "@/components/animated-container"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { certificatesAPI } from "@/lib/api/certificates-api"
import { formatDate } from "@/utils/certificate-helpers"
import { useRouter } from "next/navigation"

export default function StudentDashboardPage() {
  const router = useRouter()

  const { data: certificates, isLoading } = useQuery({
    queryKey: ["student", "certificates"],
    queryFn: () => certificatesAPI.getCertificates(),
  })

  const studentCerts = certificates || []
  const activeCerts = studentCerts.filter((c) => c.status === "active")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">My Dashboard</h1>
        <p className="text-muted-foreground">Access and manage your certificates</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnimatedContainer>
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Certificates</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentCerts.length}</div>
            </CardContent>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.05}>
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeCerts.length}</div>
            </CardContent>
          </Card>
        </AnimatedContainer>

        <AnimatedContainer delay={0.1}>
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">Downloaded</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Download className="w-5 h-5 text-info" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeCerts.length}</div>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>

      {/* Recent Certificates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Certificates</h2>
          <Button variant="ghost" onClick={() => router.push("/student/certificates")}>
            View All
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <LoadingSkeleton key={i} variant="card" />
            ))}
          </div>
        ) : studentCerts.length > 0 ? (
          <div className="space-y-3">
            {studentCerts.slice(0, 3).map((cert, index) => (
              <AnimatedContainer key={cert.id} delay={index * 0.05}>
                <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{cert.course}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cert.program} • {cert.session} {cert.year}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Issued: {formatDate(cert.issueDate)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" onClick={() => window.open(`/verify/${cert.id}`, "_blank")}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Verify
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FileCheck className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No certificates yet</h3>
              <p className="text-sm text-muted-foreground">Your certificates will appear here once issued</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
