"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface PDFViewerProps {
  fileUrl: string
  title?: string
  height?: string
}

export function PDFViewer({ fileUrl, title = "Certificate Preview", height = "600px" }: PDFViewerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg overflow-hidden" style={{ height }}>
          {/* Placeholder for PDF viewer - In production, use a proper PDF viewer library */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-3">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Certificate Document</p>
                <p className="text-xs text-muted-foreground mt-1">PDF viewer would render here</p>
              </div>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-block"
              >
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
