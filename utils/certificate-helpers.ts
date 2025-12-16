import type { CertificateStatus, VerificationStatus } from "@/types/certificate"

export function getStatusColor(status: CertificateStatus | VerificationStatus): string {
  const statusColors = {
    active: "bg-success text-success-foreground",
    verified: "bg-success text-success-foreground",
    revoked: "bg-destructive text-destructive-foreground",
    suspended: "bg-warning text-warning-foreground",
    expired: "bg-muted text-muted-foreground",
    suspicious: "bg-warning text-warning-foreground",
  }

  return statusColors[status] || "bg-muted text-muted-foreground"
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function generateCertificateNumber(): string {
  const prefix = "MVXC"
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0")
  return `${prefix}-${year}-${random}`
}

export function truncateHash(hash: string, length = 16): string {
  if (hash.length <= length) return hash
  return `${hash.slice(0, length)}...${hash.slice(-8)}`
}
