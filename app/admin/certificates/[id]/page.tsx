"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, RotateCcw, Ban, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QRCodeViewer } from "@/components/qr-code-viewer"
import { PDFViewer } from "@/components/pdf-viewer"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { mockCertificates, mockAuditLogs } from "@/lib/mock-data"
import { getStatusColor, formatDate, formatDateTime } from "@/utils/certificate-helpers"
import { AnimatedContainer, SlideIn } from "@/components/animated-container"
import { useState } from "react"
import Link from "next/link"

export default function CertificateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [revokeModalOpen, setRevokeModalOpen] = useState(false)
  const [regenerateModalOpen, setRegenerateModalOpen] = useState(false)

  // Find certificate (mock data)
  const certificate = mockCertificates.find((cert) => cert.id === params.id)
  const auditLogs = mockAuditLogs.filter((log) => log.certificateId === params.id)

  if (!certificate) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Certificate not found</p>
        <Button onClick={() => router.push("/admin/certificates")} className="mt-4">
          Back to Certificates
        </Button>
      </div>
    )
  }

  const verificationUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/verify/${certificate.id}`

  const handleRevoke = () => {
    console.log("[v0] Revoking certificate:", certificate.id)
    setRevokeModalOpen(false)
  }

  const handleRegenerate = () => {
    console.log("[v0] Regenerating QR code for:", certificate.id)
    setRegenerateModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/admin/certificates")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{certificate.certificateNumber}</h1>
              <p className="text-muted-foreground mt-1">Certificate details and verification</p>
            </div>
          </div>
          <Badge
            className={getStatusColor(certificate.status)}
            style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}
          >
            {certificate.status.toUpperCase()}
          </Badge>
        </div>
      </AnimatedContainer>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Information */}
          <SlideIn delay={0.1} direction="left">
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={certificate.student.photoUrl || "/placeholder.svg"}
                      alt={certificate.student.name}
                    />
                    <AvatarFallback>
                      {certificate.student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{certificate.student.name}</h3>
                    <p className="text-muted-foreground">{certificate.student.studentId}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground mb-1">Email</dt>
                    <dd className="font-medium">{certificate.student.email}</dd>
                  </div>
                  {certificate.student.phone && (
                    <div>
                      <dt className="text-muted-foreground mb-1">Phone</dt>
                      <dd className="font-medium">{certificate.student.phone}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-muted-foreground mb-1">Program</dt>
                    <dd className="font-medium">{certificate.program}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Course</dt>
                    <dd className="font-medium">{certificate.course}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Session</dt>
                    <dd className="font-medium">{certificate.session}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Year</dt>
                    <dd className="font-medium">{certificate.year}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Issue Date</dt>
                    <dd className="font-medium">{formatDate(certificate.issueDate)}</dd>
                  </div>
                  {certificate.expiryDate && (
                    <div>
                      <dt className="text-muted-foreground mb-1">Expiry Date</dt>
                      <dd className="font-medium">{formatDate(certificate.expiryDate)}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          </SlideIn>

          {/* Certificate Preview */}
          <SlideIn delay={0.2} direction="left">
            <PDFViewer fileUrl={certificate.certificateFileUrl} title="Certificate Document" height="500px" />
          </SlideIn>

          {/* Audit Logs */}
          <SlideIn delay={0.3} direction="left">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex gap-3 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium capitalize">{log.action}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDateTime(log.timestamp)}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs mt-0.5">{log.details}</p>
                        <p className="text-muted-foreground text-xs">By: {log.performedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* QR Code */}
          <SlideIn delay={0.1} direction="right">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">QR Code</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <QRCodeViewer
                  qrCodeUrl={certificate.qrCodeUrl}
                  certificateNumber={certificate.certificateNumber}
                  size="lg"
                  showDownload
                />
              </CardContent>
            </Card>
          </SlideIn>

          {/* Verification URL */}
          <SlideIn delay={0.15} direction="right">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification URL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <code className="text-xs bg-muted p-2 rounded block overflow-x-auto break-all">
                    {verificationUrl}
                  </code>
                  <Link href={`/verify/${certificate.id}`} target="_blank">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Verification Page
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          {/* Actions */}
          <SlideIn delay={0.2} direction="right">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                {certificate.status === "active" && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => setRegenerateModalOpen(true)}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Regenerate QR Code
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={() => setRevokeModalOpen(true)}
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      Revoke Certificate
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </SlideIn>

          {/* Metadata */}
          <SlideIn delay={0.25} direction="right">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground mb-1">Created</dt>
                    <dd className="font-medium">{formatDateTime(certificate.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Last Updated</dt>
                    <dd className="font-medium">{formatDateTime(certificate.updatedAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Certificate ID</dt>
                    <dd className="font-mono text-xs break-all">{certificate.id}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </SlideIn>
        </div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        open={revokeModalOpen}
        onOpenChange={setRevokeModalOpen}
        title="Revoke Certificate"
        description="Are you sure you want to revoke this certificate? This action cannot be undone and the certificate will no longer be valid."
        onConfirm={handleRevoke}
        confirmText="Revoke Certificate"
        variant="destructive"
      />

      <ConfirmationModal
        open={regenerateModalOpen}
        onOpenChange={setRegenerateModalOpen}
        title="Regenerate QR Code"
        description="This will generate a new QR code for this certificate. The old QR code will no longer work."
        onConfirm={handleRegenerate}
        confirmText="Regenerate"
      />
    </div>
  )
}
