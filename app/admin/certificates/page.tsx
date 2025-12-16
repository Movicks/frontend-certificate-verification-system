"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CertificateCard } from "@/components/certificate-card"
import { CertificateCardSkeleton } from "@/components/loading-skeleton"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { mockCertificates } from "@/lib/mock-data"
import { AnimatedContainer, SlideIn } from "@/components/animated-container"
import { useRouter } from "next/navigation"

export default function CertificatesListPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [revokeModalOpen, setRevokeModalOpen] = useState(false)
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null)

  // Filter certificates
  const filteredCertificates = mockCertificates.filter((cert) => {
    const matchesSearch =
      cert.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.student.studentId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || cert.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleView = (id: string) => {
    router.push(`/admin/certificates/${id}`)
  }

  const handleRevoke = (id: string) => {
    setSelectedCertId(id)
    setRevokeModalOpen(true)
  }

  const confirmRevoke = () => {
    console.log("[v0] Revoking certificate:", selectedCertId)
    // Mock API call
    setRevokeModalOpen(false)
    setSelectedCertId(null)
  }

  const handleRegenerate = (id: string) => {
    console.log("[v0] Regenerating QR code for:", id)
    // Mock API call
  }

  const handleDownload = (id: string) => {
    console.log("[v0] Downloading certificate:", id)
    // Mock download
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedContainer>
        <div className="block md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">All Certificates</h1>
            <p className="text-muted-foreground mt-1">Manage and search certificates</p>
          </div>
          <Button onClick={() => router.push("/admin/upload")}>Upload New Certificate</Button>
        </div>
      </AnimatedContainer>

      {/* Filters */}
      <SlideIn delay={0.1} direction="down">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, certificate number, or student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="revoked">Revoked</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </SlideIn>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCertificates.length} of {mockCertificates.length} certificates
      </div>

      {/* Certificate Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <CertificateCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCertificates.map((certificate, index) => (
            <SlideIn key={certificate.id} delay={0.1 + index * 0.05} direction="up">
              <CertificateCard
                certificate={certificate}
                onView={handleView}
                onRevoke={handleRevoke}
                onRegenerate={handleRegenerate}
                onDownload={handleDownload}
              />
            </SlideIn>
          ))}
        </div>
      )}

      {filteredCertificates.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No certificates found matching your criteria</p>
        </div>
      )}

      {/* Revoke Confirmation Modal */}
      <ConfirmationModal
        open={revokeModalOpen}
        onOpenChange={setRevokeModalOpen}
        title="Revoke Certificate"
        description="Are you sure you want to revoke this certificate? This action cannot be undone and the certificate will no longer be valid."
        onConfirm={confirmRevoke}
        confirmText="Revoke Certificate"
        variant="destructive"
      />
    </div>
  )
}
