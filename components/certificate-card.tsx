"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, RotateCcw, Ban } from "lucide-react"
import type { Certificate } from "@/types/certificate"
import { getStatusColor, formatDate } from "@/utils/certificate-helpers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CertificateCardProps {
  certificate: Certificate
  onView?: (id: string) => void
  onRevoke?: (id: string) => void
  onRegenerate?: (id: string) => void
  onDownload?: (id: string) => void
  showActions?: boolean
}

export function CertificateCard({
  certificate,
  onView,
  onRevoke,
  onRegenerate,
  onDownload,
  showActions = true,
}: CertificateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={certificate.student.photoUrl || "/placeholder.svg"} alt={certificate.student.name} />
              <AvatarFallback>
                {certificate.student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{certificate.student.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{certificate.certificateNumber}</p>
            </div>
          </div>
          <Badge className={getStatusColor(certificate.status)}>{certificate.status.toUpperCase()}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Student ID:</dt>
            <dd className="font-medium">{certificate.student.studentId}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Program:</dt>
            <dd className="font-medium">{certificate.program}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Course:</dt>
            <dd className="font-medium">{certificate.course}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Session:</dt>
            <dd className="font-medium">{certificate.session}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Issue Date:</dt>
            <dd className="font-medium">{formatDate(certificate.issueDate)}</dd>
          </div>
        </dl>
      </CardContent>
      {showActions && (
        <CardFooter className="flex gap-2">
          <Button onClick={() => onView?.(certificate.id)} variant="default" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          {certificate.status === "active" && (
            <>
              <Button onClick={() => onRegenerate?.(certificate.id)} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button onClick={() => onRevoke?.(certificate.id)} variant="destructive" size="sm">
                <Ban className="w-4 h-4" />
              </Button>
            </>
          )}
          <Button onClick={() => onDownload?.(certificate.id)} variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
