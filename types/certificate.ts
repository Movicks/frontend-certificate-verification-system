export type CertificateStatus = "active" | "revoked" | "suspended" | "expired"

export type VerificationStatus = "verified" | "revoked" | "suspicious" | "expired"

export interface Student {
  id: string
  name: string
  studentId: string
  email: string
  phone?: string
  photoUrl?: string
}

export interface Certificate {
  id: string
  certificateNumber: string
  institutionId: string
  institutionName: string
  student: Student
  program: string
  course: string
  session: string
  year: number
  issueDate: string
  expiryDate?: string
  status: CertificateStatus
  qrCodeUrl: string
  certificateFileUrl: string
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface QRDetails {
  certificateId: string
  qrCode: string // Base64 or URL
  verificationUrl: string
  generatedAt: string
}

export interface VerificationData {
  certificate: Certificate
  verificationStatus: VerificationStatus
  verificationTimestamp: string
  certificateHash: string
  digitalSignature: string
  scanCount: number
  integrityCheck: {
    status: "passed" | "failed" | "warning"
    message: string
  }
  tamperDetection: {
    status: "secure" | "tampered" | "suspicious"
    message: string
  }
  revocationStatus: {
    isRevoked: boolean
    revokedAt?: string
    reason?: string
  }
}

export interface AuditLog {
  id: string
  certificateId: string
  action: "created" | "viewed" | "updated" | "revoked" | "regenerated" | "scanned"
  performedBy: string
  timestamp: string
  details?: string
  ipAddress?: string
}

export interface DashboardStats {
  totalCertificates: number
  activeCertificates: number
  revokedCertificates: number
  totalScans: number
  recentVerifications: number
  certificatesThisMonth: number
}

export interface BulkUploadRow {
  studentName: string
  studentId: string
  email: string
  phone?: string
  program: string
  course: string
  session: string
  year: number
  issueDate: string
  expiryDate?: string
}

export interface BulkUploadResult {
  total: number
  successful: number
  failed: number
  errors: Array<{ row: number; error: string }>
}
