"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QRCodeViewerProps {
  qrCodeUrl: string
  certificateNumber: string
  size?: "sm" | "md" | "lg"
  showDownload?: boolean
}

export function QRCodeViewer({ qrCodeUrl, certificateNumber, size = "md", showDownload = false }: QRCodeViewerProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  }

  const handleDownload = () => {
    // Create a link and trigger download
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `qr-code-${certificateNumber}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="inline-block">
      <CardContent className="p-4 flex flex-col items-center gap-3">
        <div className={`${sizeClasses[size]} relative bg-white p-2 rounded-lg`}>
          <img
            src={qrCodeUrl || "/placeholder.svg"}
            alt={`QR Code for ${certificateNumber}`}
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-sm text-muted-foreground text-center">{certificateNumber}</p>
        {showDownload && (
          <Button onClick={handleDownload} variant="outline" size="sm" className="w-full bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
