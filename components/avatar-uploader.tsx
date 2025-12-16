"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"

interface AvatarUploaderProps {
  onFileSelect: (file: File | null) => void
  label?: string
  defaultImage?: string
  maxSize?: number // in MB
}

export function AvatarUploader({
  onFileSelect,
  label = "Student Photo",
  defaultImage,
  maxSize = 2,
}: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null)
  const [error, setError] = useState<string | null>(null)

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setError(null)

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file")
        return
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size exceeds ${maxSize}MB`)
        return
      }

      // Generate preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      onFileSelect(file)
    },
    [maxSize, onFileSelect],
  )

  const handleRemove = useCallback(() => {
    setPreview(null)
    setError(null)
    onFileSelect(null)
  }, [onFileSelect])

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={preview || undefined} alt="Student photo" />
          <AvatarFallback>
            <Camera className="w-8 h-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <label>
            <Button type="button" variant="outline" size="sm" asChild>
              <span className="cursor-pointer">
                <Camera className="w-4 h-4 mr-2" />
                {preview ? "Change" : "Upload"}
              </span>
            </Button>
            <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
          </label>
          {preview && (
            <Button type="button" onClick={handleRemove} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">Recommended: Square image, max {maxSize}MB</p>
    </div>
  )
}
