"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Download, UploadIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CertificateCard } from "@/components/certificate-card"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { certificatesAPI } from "@/lib/api/certificates-api"
import { AnimatedContainer, SlideIn } from "@/components/animated-container"
import { useRouter } from "next/navigation"

export default function CertificatesListPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [revokeModalOpen, setRevokeModalOpen] = useState(false)
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null)

  const { data: certificates, isLoading } = useQuery({
    queryKey: ["certificates", { status: statusFilter, search: searchQuery }],
    queryFn: () => certificatesAPI.getCertificates({ status: statusFilter, search: searchQuery }),
  })

  const revokeMutation = useMutation({
    mutationFn: (id: string) => certificatesAPI.revokeCertificate(id, "Revoked by admin"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] })
      setRevokeModalOpen(false)
      setSelectedCertId(null)
    },
  })

  const filteredCertificates = certificates || []

  const handleView = (id: string) => {
    router.push(`/dashboard/certificates/${id}`)
  }

  const handleRevoke = (id: string) => {
    setSelectedCertId(id)
    setRevokeModalOpen(true)
  }

  const confirmRevoke = () => {
    if (selectedCertId) {
      revokeMutation.mutate(selectedCertId)
    }
  }

  const handleRegenerate = (id: string) => {
    console.log("Regenerating QR code for:", id)
  }

  const handleDownload = (id: string) => {
    console.log("Downloading certificate:", id)
  }

  return (
    <div className="md:space-y-6">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-balance">All Certificates</h1>
            <p className="text-muted-foreground mt-1">Manage and search certificates</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/certificates/bulk")}
              className="bg-transparent"
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
            <Button onClick={() => router.push("/dashboard/upload")}>Upload New</Button>
          </div>
        </div>
      </AnimatedContainer>

      {/* Filters */}
      <SlideIn delay={0.1} direction="down">
        <div className="flex sm:flex-row gap-4">
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
      {!isLoading && (
        <div className="text-sm text-muted-foreground">Showing {filteredCertificates.length} certificate(s)</div>
      )}

      {/* Certificate Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={i} variant="card" />
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
