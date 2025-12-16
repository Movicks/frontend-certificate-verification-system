"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Download,
  XCircle,
  RefreshCw,
  Eye,
  Calendar,
  User,
  Mail,
  Phone,
  GraduationCap,
  FileText,
} from "lucide-react"
import { QRCodeViewer } from "@/components/qr-code-viewer"
import { VerificationStatusBadge } from "@/components/verification-status-badge"
import { AnimatedContainer } from "@/components/animated-container"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { certificatesAPI } from "@/lib/api/certificates-api"
import { formatDate } from "@/utils/certificate-helpers"

export default function CertificateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const certificateId = params.id as string

  const { data: certificate, isLoading } = useQuery({
    queryKey: ["certificate", certificateId],
    queryFn: () => certificatesAPI.getCertificate(certificateId),
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" />
        <div className="grid md:grid-cols-2 gap-6">
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
        </div>
      </div>
    )
  }

  if (!certificate) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Certificate not found</p>
        <Button onClick={() => router.push("/dashboard/certificates")} className="mt-4">
          Back to Certificates
        </Button>
      </div>
    )
  }

  const verificationUrl = `${window.location.origin}/verify/${certificate.id}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/dashboard/certificates")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Certificates
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate QR
            </Button>
            <Button variant="destructive" size="sm">
              <XCircle className="w-4 h-4 mr-2" />
              Revoke
            </Button>
          </div>
        </div>
      </AnimatedContainer>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Certificate Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Certificate Info */}
          <AnimatedContainer delay={0.1}>
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Certificate Details</CardTitle>
                    <CardDescription>Certificate #{certificate.certificateNumber}</CardDescription>
                  </div>
                  <VerificationStatusBadge status={certificate.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Program</p>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <p className="font-medium">{certificate.program}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Course</p>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <p className="font-medium">{certificate.course}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Session & Year</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p className="font-medium">
                          {certificate.session} {certificate.year}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p className="font-medium">{formatDate(certificate.issueDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-3">Student Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      {certificate.student.photoUrl && (
                        <img
                          src={certificate.student.photoUrl || "/placeholder.svg"}
                          alt={certificate.student.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <p className="font-medium">{certificate.student.name}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">ID: {certificate.student.studentId}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{certificate.student.email}</span>
                      </div>
                      {certificate.student.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{certificate.student.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>

          {/* Audit Log */}
          <AnimatedContainer delay={0.2}>
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent actions performed on this certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Certificate created", date: certificate.createdAt, user: "Admin" },
                    { action: "QR code generated", date: certificate.createdAt, user: "System" },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">by {log.user}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{formatDate(log.date)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>

        {/* Right Column - QR & Verification */}
        <div className="space-y-6">
          {/* QR Code */}
          <AnimatedContainer delay={0.15}>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">QR Code</CardTitle>
                <CardDescription>Scan to verify certificate</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <QRCodeViewer
                  qrCodeUrl={certificate.qrCodeUrl}
                  certificateNumber={certificate.certificateNumber}
                  showDownload
                />
              </CardContent>
            </Card>
          </AnimatedContainer>

          {/* Verification URL */}
          <AnimatedContainer delay={0.2}>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Public Verification URL:</p>
                  <code className="text-xs bg-muted p-2 rounded block overflow-x-auto break-all">
                    {verificationUrl}
                  </code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => window.open(verificationUrl, "_blank")}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Page
                </Button>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  )
}
