"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, X, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  accept?: string
  maxSize?: number // in MB
  onFileSelect: (file: File | null) => void
  label?: string
  preview?: boolean
  value?: File | null
}

export function FileUploader({ accept, maxSize = 5, onFileSelect, label, preview = true, value }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(value || null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(
    (file: File) => {
      setError(null)

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size exceeds ${maxSize}MB`)
        return
      }

      setSelectedFile(file)
      onFileSelect(file)

      // Generate preview for images
      if (preview && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [maxSize, onFileSelect, preview],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile],
  )

  const handleRemove = useCallback(() => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setError(null)
    onFileSelect(null)
  }, [onFileSelect])

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          error && "border-destructive",
        )}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {previewUrl ? (
                <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-16 h-16 object-cover rounded" />
              ) : (
                <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                  <File className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <Button type="button" onClick={handleRemove} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">Drop file here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Maximum file size: {maxSize}MB</p>
            </div>
            <input type="file" accept={accept} onChange={handleFileInput} className="hidden" />
          </label>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
