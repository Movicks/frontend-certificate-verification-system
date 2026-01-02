"use client"

import type {
  Certificate,
  DashboardStats,
  VerificationData,
  BulkUploadResult,
  BulkUploadRow,
} from "@/types/certificate"
import type { CertificateFormData } from "@/types/forms"
import { mockCertificates, mockStats, mockVerificationData } from "@/lib/mock-data"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL|| "/api"

export const certificatesAPI = {
  // Get all certificates for institution
  async getCertificates(filters?: { status?: string; search?: string }): Promise<Certificate[]> {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...mockCertificates]

        if (filters?.status && filters.status !== "all") {
          results = results.filter((cert) => cert.status === filters.status)
        }

        if (filters?.search) {
          const searchLower = filters.search.toLowerCase()
          results = results.filter(
            (cert) =>
              cert.student.name.toLowerCase().includes(searchLower) ||
              cert.certificateNumber.toLowerCase().includes(searchLower) ||
              cert.student.studentId.toLowerCase().includes(searchLower),
          )
        }

        resolve(results)
      }, 500)
    })
  },

  // Get single certificate
  async getCertificate(id: string): Promise<Certificate> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cert = mockCertificates.find((c) => c.id === id)
        if (cert) {
          resolve(cert)
        } else {
          reject(new Error("Certificate not found"))
        }
      }, 500)
    })
  },

  // Create certificate
  async createCertificate(data: CertificateFormData): Promise<Certificate> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCert: Certificate = {
          id: `cert-${Date.now()}`,
          certificateNumber: `CERT-${Date.now()}`,
          institutionId: "inst-001",
          institutionName: "Tech University",
          student: {
            id: `student-${Date.now()}`,
            name: data.studentName,
            studentId: data.studentId,
            email: data.email,
            phone: data.phone,
            photoUrl: data.passportPhoto,
          },
          program: data.program,
          course: data.course,
          session: data.session,
          year: data.year,
          issueDate: data.issueDate,
          expiryDate: data.expiryDate,
          status: "active",
          qrCodeUrl: "/qr-code.png",
          certificateFileUrl: data.certificateFile || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        resolve(newCert)
      }, 1000)
    })
  },

  // Bulk upload certificates
  async bulkUploadCertificates(rows: BulkUploadRow[]): Promise<BulkUploadResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation and processing
        const errors: Array<{ row: number; error: string }> = []
        rows.forEach((row, index) => {
          if (!row.studentName || !row.studentId || !row.email) {
            errors.push({ row: index + 1, error: "Missing required fields" })
          }
        })

        resolve({
          total: rows.length,
          successful: rows.length - errors.length,
          failed: errors.length,
          errors,
        })
      }, 2000)
    })
  },

  // Get dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockStats)
      }, 500)
    })
  },

  // Verify certificate (public)
  async verifyCertificate(certificateId: string): Promise<VerificationData> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cert = mockCertificates.find((c) => c.id === certificateId)
        if (cert) {
          resolve({
            ...mockVerificationData,
            certificate: cert,
          })
        } else {
          reject(new Error("Certificate not found"))
        }
      }, 1000)
    })
  },

  // Revoke certificate
  async revokeCertificate(id: string, reason: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[v0] Revoking certificate ${id}: ${reason}`)
        resolve()
      }, 800)
    })
  },

  // Regenerate QR code
  async regenerateQR(id: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("/qr-code.png")
      }, 500)
    })
  },
}
