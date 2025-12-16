"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Building2, Mail, Phone, Globe, CheckCircle, XCircle, Clock, Ban, MoreVertical } from "lucide-react"
import { AnimatedContainer, SlideIn } from "@/components/animated-container"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { superAdminAPI } from "@/lib/api/super-admin-api"
import { formatDate } from "@/utils/certificate-helpers"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function InstitutionsPage() {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState(searchParams.get("filter") || "all")
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean
    type: "approve" | "reject" | "suspend"
    institutionId: string | null
    institutionName: string
  }>({
    open: false,
    type: "approve",
    institutionId: null,
    institutionName: "",
  })

  const { data: institutions, isLoading } = useQuery({
    queryKey: ["superadmin", "institutions", statusFilter],
    queryFn: () => superAdminAPI.getInstitutions(statusFilter),
  })

  const approveMutation = useMutation({
    mutationFn: superAdminAPI.approveInstitution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superadmin", "institutions"] })
      queryClient.invalidateQueries({ queryKey: ["superadmin", "stats"] })
      setConfirmModal({ ...confirmModal, open: false })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => superAdminAPI.rejectInstitution(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superadmin", "institutions"] })
      queryClient.invalidateQueries({ queryKey: ["superadmin", "stats"] })
      setConfirmModal({ ...confirmModal, open: false })
    },
  })

  const suspendMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => superAdminAPI.suspendInstitution(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["superadmin", "institutions"] })
      queryClient.invalidateQueries({ queryKey: ["superadmin", "stats"] })
      setConfirmModal({ ...confirmModal, open: false })
    },
  })

  const filteredInstitutions =
    institutions?.filter((inst) => inst.name.toLowerCase().includes(searchQuery.toLowerCase())) || []

  const handleAction = (type: "approve" | "reject" | "suspend", id: string, name: string) => {
    setConfirmModal({ open: true, type, institutionId: id, institutionName: name })
  }

  const confirmAction = () => {
    if (!confirmModal.institutionId) return

    if (confirmModal.type === "approve") {
      approveMutation.mutate(confirmModal.institutionId)
    } else if (confirmModal.type === "reject") {
      rejectMutation.mutate({ id: confirmModal.institutionId, reason: "Not eligible" })
    } else if (confirmModal.type === "suspend") {
      suspendMutation.mutate({ id: confirmModal.institutionId, reason: "Policy violation" })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-success/10 text-success hover:bg-success/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "suspended":
        return (
          <Badge className="bg-muted text-muted-foreground hover:bg-muted/80">
            <Ban className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedContainer>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Institutions</h1>
          <p className="text-muted-foreground">Manage and approve institution registrations</p>
        </div>
      </AnimatedContainer>

      {/* Filters */}
      <SlideIn delay={0.1} direction="down">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search institutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SlideIn>

      {/* Results Count */}
      {!isLoading && (
        <div className="text-sm text-muted-foreground">Showing {filteredInstitutions.length} institution(s)</div>
      )}

      {/* Institution List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} variant="card" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInstitutions.map((inst, index) => (
            <SlideIn key={inst.id} delay={0.1 + index * 0.05} direction="up">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{inst.name}</CardTitle>
                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {inst.email}
                          </div>
                          {inst.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {inst.phone}
                            </div>
                          )}
                          {inst.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              <a
                                href={inst.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {inst.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(inst.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {inst.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleAction("approve", inst.id, inst.name)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("reject", inst.id, inst.name)}>
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {inst.status === "approved" && (
                            <DropdownMenuItem onClick={() => handleAction("suspend", inst.id, inst.name)}>
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Created:</span> {formatDate(inst.createdAt)}
                    </div>
                    {inst.approvedAt && (
                      <div>
                        <span className="font-medium">Approved:</span> {formatDate(inst.approvedAt)}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={`${confirmModal.type.charAt(0).toUpperCase() + confirmModal.type.slice(1)} Institution`}
        description={`Are you sure you want to ${confirmModal.type} ${confirmModal.institutionName}?`}
        onConfirm={confirmAction}
        confirmText={confirmModal.type.charAt(0).toUpperCase() + confirmModal.type.slice(1)}
        variant={confirmModal.type === "approve" ? "default" : "destructive"}
      />
    </div>
  )
}
