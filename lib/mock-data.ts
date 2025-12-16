import type { Certificate, DashboardStats, AuditLog, VerificationData } from "@/types/certificate"

export const mockCertificates: Certificate[] = [
  {
    id: "cert-001",
    certificateNumber: "MVXC-2024-001",
    institutionId: "inst-001",
    institutionName: "Tech University",
    student: {
      id: "std-001",
      name: "John Doe",
      studentId: "STD2024001",
      email: "john.doe@example.com",
      phone: "+1234567890",
      photoUrl: "/professional-student-photo.jpg",
    },
    program: "Bachelor of Science",
    course: "Computer Science",
    session: "Fall 2024",
    year: 2024,
    issueDate: "2024-12-01",
    status: "active",
    qrCodeUrl: "/qr-code.png",
    certificateFileUrl: "/placeholder.pdf",
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-01T10:00:00Z",
  },
  {
    id: "cert-002",
    certificateNumber: "MVXC-2024-002",
    institutionId: "inst-001",
    institutionName: "Tech University",
    student: {
      id: "std-002",
      name: "Jane Smith",
      studentId: "STD2024002",
      email: "jane.smith@example.com",
      phone: "+1234567891",
      photoUrl: "/professional-student-photo-female.jpg",
    },
    program: "Master of Arts",
    course: "Data Science",
    session: "Spring 2024",
    year: 2024,
    issueDate: "2024-06-15",
    status: "active",
    qrCodeUrl: "/qr-code.png",
    certificateFileUrl: "/placeholder.pdf",
    createdAt: "2024-06-15T14:30:00Z",
    updatedAt: "2024-06-15T14:30:00Z",
  },
  {
    id: "cert-003",
    certificateNumber: "MVXC-2023-045",
    institutionId: "inst-001",
    institutionName: "Tech University",
    student: {
      id: "std-003",
      name: "Michael Johnson",
      studentId: "STD2023045",
      email: "michael.j@example.com",
      photoUrl: "/professional-student-photo.jpg",
    },
    program: "Bachelor of Engineering",
    course: "Software Engineering",
    session: "Fall 2023",
    year: 2023,
    issueDate: "2023-12-10",
    status: "revoked",
    qrCodeUrl: "/qr-code.png",
    certificateFileUrl: "/placeholder.pdf",
    createdAt: "2023-12-10T09:00:00Z",
    updatedAt: "2024-03-15T16:20:00Z",
  },
]

export const mockStats: DashboardStats = {
  totalCertificates: 1247,
  activeCertificates: 1189,
  revokedCertificates: 58,
  totalScans: 8934,
  recentVerifications: 127,
  certificatesThisMonth: 45,
}

export const mockDashboardStats: DashboardStats = mockStats

export const mockAuditLogs: AuditLog[] = [
  {
    id: "log-001",
    certificateId: "cert-001",
    action: "scanned",
    performedBy: "Anonymous",
    timestamp: "2024-12-10T15:30:00Z",
    details: "QR code scanned from public verification page",
    ipAddress: "192.168.1.1",
  },
  {
    id: "log-002",
    certificateId: "cert-001",
    action: "created",
    performedBy: "admin@movicx.com",
    timestamp: "2024-12-01T10:00:00Z",
    details: "Certificate initially created",
    ipAddress: "10.0.0.1",
  },
  {
    id: "log-003",
    certificateId: "cert-003",
    action: "revoked",
    performedBy: "admin@movicx.com",
    timestamp: "2024-03-15T16:20:00Z",
    details: "Certificate revoked due to data discrepancy",
    ipAddress: "10.0.0.1",
  },
]

export const mockVerificationData: VerificationData = {
  certificate: mockCertificates[0],
  verificationStatus: "verified",
  verificationTimestamp: new Date().toISOString(),
  certificateHash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
  digitalSignature: "SHA256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  scanCount: 15,
  integrityCheck: {
    status: "passed",
    message: "Certificate integrity verified successfully",
  },
  tamperDetection: {
    status: "secure",
    message: "No tampering detected",
  },
  revocationStatus: {
    isRevoked: false,
  },
}
