"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, XCircle, RefreshCw, Plus } from "lucide-react"
import { AnimatedContainer, SlideIn } from "@/components/animated-container"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { superAdminAPI } from "@/lib/api/super-admin-api"
import { formatDate } from "@/utils/certificate-helpers"

export default function AuditLogsPage() {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["superadmin", "audit-logs"],
    queryFn: superAdminAPI.getAuditLogs,
  })

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
        return <Plus className="w-4 h-4" />
      case "scanned":
      case "viewed":
        return <Eye className="w-4 h-4" />
      case "revoked":
        return <XCircle className="w-4 h-4" />
      case "regenerated":
        return <RefreshCw className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "created":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Created</Badge>
      case "scanned":
      case "viewed":
        return <Badge className="bg-info/10 text-info hover:bg-info/20">Viewed</Badge>
      case "revoked":
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Revoked</Badge>
      case "regenerated":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Regenerated</Badge>
      default:
        return <Badge>Updated</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedContainer>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Audit Logs</h1>
          <p className="text-muted-foreground">System-wide activity and action history</p>
        </div>
      </AnimatedContainer>

      {/* Logs List */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingSkeleton key={i} variant="card" />
          ))}
        </div>
      ) : logs && logs.length > 0 ? (
        <div className="space-y-3">
          {logs.map((log, index) => (
            <SlideIn key={log.id} delay={index * 0.05} direction="up">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      {getActionIcon(log.action)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getActionBadge(log.action)}
                        <span className="text-sm text-muted-foreground">by {log.performedBy}</span>
                      </div>
                      <p className="text-sm text-foreground">{log.details}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Certificate ID: {log.certificateId}</span>
                        <span>{formatDate(log.timestamp)}</span>
                        {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No audit logs</h3>
            <p className="text-sm text-muted-foreground">System activity will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
