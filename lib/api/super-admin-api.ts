"use client"

import type { Institution } from "@/types/auth"
import type { AuditLog } from "@/types/certificate"

export const superAdminAPI = {
  // Get all institutions
  async getInstitutions(filter?: string): Promise<Institution[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockInstitutions: Institution[] = [
          {
            id: "inst-001",
            name: "Tech University",
            email: "contact@techuniversity.edu",
            status: "approved",
            phone: "+1 (555) 123-4567",
            website: "https://techuniversity.edu",
            address: "123 Education St, Tech City, TC 12345",
            approvedAt: "2024-01-15T00:00:00Z",
            createdAt: "2024-01-10T00:00:00Z",
          },
          {
            id: "inst-002",
            name: "Business College",
            email: "admin@businesscollege.edu",
            status: "pending",
            phone: "+1 (555) 987-6543",
            website: "https://businesscollege.edu",
            address: "456 Commerce Ave, Business City, BC 54321",
            createdAt: "2024-12-14T00:00:00Z",
          },
          {
            id: "inst-003",
            name: "Science Institute",
            email: "info@scienceinstitute.edu",
            status: "approved",
            phone: "+1 (555) 246-8135",
            approvedAt: "2024-02-20T00:00:00Z",
            createdAt: "2024-02-15T00:00:00Z",
          },
          {
            id: "inst-004",
            name: "Arts Academy",
            email: "hello@artsacademy.edu",
            status: "pending",
            phone: "+1 (555) 135-7902",
            createdAt: "2024-12-15T00:00:00Z",
          },
        ]

        const filtered =
          filter === "all" || !filter ? mockInstitutions : mockInstitutions.filter((i) => i.status === filter)

        resolve(filtered)
      }, 500)
    })
  },

  // Approve institution
  async approveInstitution(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] Approving institution ${id}`)
        resolve()
      }, 800)
    })
  },

  // Reject institution
  async rejectInstitution(id: string, reason: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] Rejecting institution ${id}: ${reason}`)
        resolve()
      }, 800)
    })
  },

  // Suspend institution
  async suspendInstitution(id: string, reason: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] Suspending institution ${id}: ${reason}`)
        resolve()
      }, 800)
    })
  },

  // Get system stats
  async getSystemStats(): Promise<{
    totalInstitutions: number
    pendingApprovals: number
    totalCertificates: number
    totalStudents: number
    recentActivity: number
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalInstitutions: 15,
          pendingApprovals: 3,
          totalCertificates: 1247,
          totalStudents: 856,
          recentActivity: 142,
        })
      }, 500)
    })
  },

  // Get audit logs
  async getAuditLogs(): Promise<AuditLog[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockLogs: AuditLog[] = [
          {
            id: "log-001",
            certificateId: "cert-001",
            action: "created",
            performedBy: "Tech University",
            timestamp: new Date().toISOString(),
            details: "Certificate issued to John Doe",
          },
          {
            id: "log-002",
            certificateId: "cert-002",
            action: "scanned",
            performedBy: "Public User",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            details: "Certificate verified via QR scan",
            ipAddress: "192.168.1.100",
          },
          {
            id: "log-003",
            certificateId: "cert-003",
            action: "revoked",
            performedBy: "Super Admin",
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            details: "Certificate revoked due to policy violation",
          },
        ]
        resolve(mockLogs)
      }, 500)
    })
  },
}
