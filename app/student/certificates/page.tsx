"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, ExternalLink, Search, FileText, Calendar, Award } from "lucide-react"
import { AnimatedContainer, SlideIn } from "@/components/animated-container"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { certificatesAPI } from "@/lib/api/certificates-api"
import { formatDate } from "@/utils/certificate-helpers"
import { VerificationStatusBadge } from "@/components/verification-status-badge"
import { useState } from "react"

export default function StudentCertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const { data: certificates, isLoading } = useQuery({
    queryKey: ["student", "certificates"],
    queryFn: () => certificatesAPI.getCertificates(),
  })

  const filteredCertificates =
    certificates?.filter(
      (cert) =>
        cert.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedContainer>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">My Certificates</h1>
          <p className="text-muted-foreground">View, download, and share your certificates</p>
        </div>
      </AnimatedContainer>

      {/* Search */}
      <SlideIn delay={0.1} direction="down">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </SlideIn>

      {/* Results Count */}
      {!isLoading && (
        <div className="text-sm text-muted-foreground">Showing {filteredCertificates.length} certificate(s)</div>
      )}

      {/* Certificate List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} variant="card" />
          ))}
        </div>
      ) : filteredCertificates.length > 0 ? (
        <div className="space-y-4">
          {filteredCertificates.map((cert, index) => (
            <SlideIn key={cert.id} delay={0.1 + index * 0.05} direction="up">
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Left: Certificate Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{cert.course}</h3>
                          <p className="text-muted-foreground">{cert.program}</p>
                        </div>
                        <VerificationStatusBadge status={cert.status} />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Session</p>
                            <p className="font-medium">
                              {cert.session} {cert.year}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Certificate #</p>
                            <p className="font-medium font-mono text-xs">{cert.certificateNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Issue Date</p>
                            <p className="font-medium">{formatDate(cert.issueDate)}</p>
                          </div>
                        </div>
                        {cert.expiryDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-muted-foreground">Expiry Date</p>
                              <p className="font-medium">{formatDate(cert.expiryDate)}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button size="sm" onClick={() => window.open(`/verify/${cert.id}`, "_blank")}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Verification
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/verify/${cert.id}`)
                          }}
                        >
                          Copy Link
                        </Button>
                      </div>
                    </div>

                    {/* Right: QR Code */}
                    <div className="flex items-center justify-center md:border-l md:pl-6">
                      <div className="text-center space-y-2">
                        <img
                          src={cert.qrCodeUrl || "/placeholder.svg"}
                          alt="QR Code"
                          className="w-32 h-32 border-2 rounded-lg"
                        />
                        <p className="text-xs text-muted-foreground">Scan to verify</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
