import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react"
import type { VerificationStatus } from "@/types/certificate"
import { getStatusColor } from "@/utils/certificate-helpers"

interface VerificationStatusBadgeProps {
  status: VerificationStatus
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

export function VerificationStatusBadge({ status, size = "md", showIcon = true }: VerificationStatusBadgeProps) {
  const icons = {
    verified: CheckCircle,
    revoked: XCircle,
    suspicious: AlertTriangle,
    expired: Clock,
  }

  const Icon = icons[status]

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  }

  return (
    <Badge className={`${getStatusColor(status)} ${sizeClasses[size]} flex items-center gap-1.5`}>
      {showIcon && <Icon className="w-4 h-4" />}
      {status.toUpperCase()}
    </Badge>
  )
}
