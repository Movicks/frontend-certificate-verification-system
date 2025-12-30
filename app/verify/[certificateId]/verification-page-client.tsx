"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VerificationStatusBadge } from "@/components/verification-status-badge"
import { PDFViewer } from "@/components/pdf-viewer"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Download,
  FileText,
  Calendar,
  Hash,
  Eye,
  Lock,
} from "lucide-react"
import type { VerificationData } from "@/types/certificate"
import { formatDate, formatDateTime, truncateHash } from "@/utils/certificate-helpers"
import { AnimatedContainer, SlideIn, FadeIn } from "@/components/animated-container"
import { useEffect, useState } from "react"

interface VerificationPageClientProps {
  certificateId: string
  verificationData: VerificationData
}

export function VerificationPageClient({ certificateId, verificationData }: VerificationPageClientProps) {
  const { certificate, verificationStatus, integrityCheck, tamperDetection, revocationStatus } = verificationData
  const [scanCount, setScanCount] = useState(verificationData.scanCount)

  useEffect(() => {
    setScanCount((prev) => prev + 1)
  }, [certificateId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section with Status */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-12">
          <AnimatedContainer>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Certificate Verification</h1>
              <div className="flex justify-center">
                <VerificationStatusBadge status={verificationStatus} size="lg" />
              </div>
              {revocationStatus.isRevoked && (
                <FadeIn delay={0.3}>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-2xl mx-auto">
                    <p className="text-destructive font-medium">
                      This certificate has been revoked on {formatDate(revocationStatus.revokedAt!)}
                    </p>
                    {revocationStatus.reason && (
                      <p className="text-sm text-destructive/80 mt-1">Reason: {revocationStatus.reason}</p>
                    )}
                  </div>
                </FadeIn>
              )}
            </div>
          </AnimatedContainer>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Student Information */}
          <SlideIn delay={0.2} direction="up">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <Avatar className="w-32 h-32 border-4 border-primary/10">
                    <AvatarImage
                      src={certificate.student.photoUrl || "/placeholder.svg"}
                      alt={certificate.student.name}
                    />
                    <AvatarFallback className="text-2xl">
                      {certificate.student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold">{certificate.student.name}</h2>
                      <p className="text-muted-foreground text-lg">{certificate.student.studentId}</p>
                    </div>
                    <Separator />
                    <dl className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Program</dt>
                        <dd className="font-semibold">{certificate.program}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Course</dt>
                        <dd className="font-semibold">{certificate.course}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Session</dt>
                        <dd className="font-semibold">{certificate.session}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Graduation Year</dt>
                        <dd className="font-semibold">{certificate.year}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Certificate Number</dt>
                        <dd className="font-mono font-semibold">{certificate.certificateNumber}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted-foreground mb-1">Issue Date</dt>
                        <dd className="font-semibold">{formatDate(certificate.issueDate)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          {/* Certificate Preview */}
          <SlideIn delay={0.3} direction="up">
            <PDFViewer fileUrl={certificate.certificateFileUrl} title="Certificate Document" height="600px" />
            <div className="mt-2 text-center">
              <p className="text-xs text-muted-foreground">
                Watermark: <span className="font-medium">Verified via MovicX System</span>
              </p>
            </div>
          </SlideIn>

          {/* Technical Validation */}
          <SlideIn delay={0.4} direction="up">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Technical Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start gap-3 mb-1">
                      <Hash className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">Certificate Hash</p>
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded break-all block">
                          {truncateHash(verificationData.certificateHash, 24)}
                        </code>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3 mb-1">
                      <Calendar className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Verification Timestamp</p>
                        <p className="text-sm font-semibold">
                          {formatDateTime(verificationData.verificationTimestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3 mb-1">
                      <Lock className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">Digital Signature</p>
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded break-all block">
                          {verificationData.digitalSignature}
                        </code>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3 mb-1">
                      <Eye className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Previous Scans</p>
                        <p className="text-sm font-semibold">{scanCount} verifications</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          {/* Security Indicators */}
          <div className="grid md:grid-cols-3 gap-4">
            <SlideIn delay={0.45} direction="up">
              <Card className={integrityCheck.status === "passed" ? "border-success" : "border-destructive"}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {integrityCheck.status === "passed" ? (
                      <CheckCircle className="w-8 h-8 text-success flex-shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="font-semibold mb-1">Integrity Check</h3>
                      <p className="text-sm text-muted-foreground">{integrityCheck.message}</p>
                      <Badge
                        className={`mt-2 ${integrityCheck.status === "passed" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`}
                      >
                        {integrityCheck.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            <SlideIn delay={0.5} direction="up">
              <Card className={tamperDetection.status === "secure" ? "border-success" : "border-warning"}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {tamperDetection.status === "secure" ? (
                      <CheckCircle className="w-8 h-8 text-success flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-8 h-8 text-warning flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="font-semibold mb-1">Tamper Detection</h3>
                      <p className="text-sm text-muted-foreground">{tamperDetection.message}</p>
                      <Badge
                        className={`mt-2 ${tamperDetection.status === "secure" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}`}
                      >
                        {tamperDetection.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            <SlideIn delay={0.55} direction="up">
              <Card className={!revocationStatus.isRevoked ? "border-success" : "border-destructive"}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {!revocationStatus.isRevoked ? (
                      <CheckCircle className="w-8 h-8 text-success flex-shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="font-semibold mb-1">Revocation Status</h3>
                      <p className="text-sm text-muted-foreground">
                        {revocationStatus.isRevoked ? "Certificate has been revoked" : "Certificate is valid"}
                      </p>
                      <Badge
                        className={`mt-2 ${!revocationStatus.isRevoked ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`}
                      >
                        {revocationStatus.isRevoked ? "REVOKED" : "VALID"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </div>

          {/* Digital Signature Info */}
          <SlideIn delay={0.6} direction="up">
            <Card className="border-primary/30">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Digital Signature Status</h3>
                    <p className="text-sm text-muted-foreground">
                      This certificate is cryptographically signed and verified by the MovicX Certificate Verification
                      System. The digital signature ensures authenticity and prevents tampering.
                    </p>
                  </div>
                  <Badge className="bg-success text-success-foreground flex-shrink-0">VERIFIED</Badge>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          {/* Download Report */}
          <SlideIn delay={0.65} direction="up">
            <div className="text-center">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download Verification Report
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Get a detailed PDF report of this verification</p>
            </div>
          </SlideIn>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-8 border-t">
            <p>
              Powered by <span className="font-semibold text-primary">MovicX</span> Certificate Verification System
            </p>
            <p className="mt-1">Secure, Transparent, Instant</p>
          </div>
        </div>
      </div>
    </div>
  )
}
