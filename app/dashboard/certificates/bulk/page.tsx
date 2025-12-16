"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Download, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { AnimatedContainer } from "@/components/animated-container"
import { certificatesAPI } from "@/lib/api/certificates-api"
import type { BulkUploadRow } from "@/types/certificate"

export default function BulkUploadPage() {
  const queryClient = useQueryClient()
  const [file, setFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<BulkUploadRow[]>([])
  const [uploadResult, setUploadResult] = useState<any>(null)

  const uploadMutation = useMutation({
    mutationFn: certificatesAPI.bulkUploadCertificates,
    onSuccess: (data) => {
      setUploadResult(data)
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] })
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadResult(null)
      // Parse CSV file
      parseCSV(selectedFile)
    }
  }

  const parseCSV = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n")
      const headers = lines[0].split(",").map((h) => h.trim())

      const rows: BulkUploadRow[] = []
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(",").map((v) => v.trim())
          rows.push({
            studentName: values[0] || "",
            studentId: values[1] || "",
            email: values[2] || "",
            phone: values[3],
            program: values[4] || "",
            course: values[5] || "",
            session: values[6] || "",
            year: Number.parseInt(values[7]) || new Date().getFullYear(),
            issueDate: values[8] || new Date().toISOString().split("T")[0],
            expiryDate: values[9],
          })
        }
      }
      setParsedData(rows)
    }
    reader.readAsText(file)
  }

  const handleUpload = () => {
    if (parsedData.length > 0) {
      uploadMutation.mutate(parsedData)
    }
  }

  const downloadTemplate = () => {
    const template = `Student Name,Student ID,Email,Phone,Program,Course,Session,Year,Issue Date,Expiry Date
John Doe,STU-2024-001,john@example.com,+1234567890,Computer Science,Web Development,Fall 2024,2024,2024-12-01,2029-12-01
Jane Smith,STU-2024-002,jane@example.com,+1234567891,Data Science,Machine Learning,Fall 2024,2024,2024-12-01,2029-12-01`

    const blob = new Blob([template], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "certificate_template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Bulk Certificate Upload</h1>
        <p className="text-muted-foreground">Upload multiple certificates at once using a CSV file</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatedContainer>
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Upload CSV File</CardTitle>
                <CardDescription>Select a CSV file containing certificate data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <div className="space-y-2">
                        <p className="font-medium">{file ? file.name : "Click to upload or drag and drop"}</p>
                        <p className="text-sm text-muted-foreground">CSV file up to 10MB</p>
                      </div>
                      <input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                  {file && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFile(null)
                        setParsedData([])
                        setUploadResult(null)
                      }}
                    >
                      Clear File
                    </Button>
                  )}
                </div>

                {parsedData.length > 0 && !uploadResult && (
                  <Alert className="border-primary/50 bg-primary/5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <AlertDescription>
                      Successfully parsed <strong>{parsedData.length}</strong> certificate(s) from the CSV file.
                    </AlertDescription>
                  </Alert>
                )}

                {parsedData.length > 0 && !uploadResult && (
                  <Button onClick={handleUpload} disabled={uploadMutation.isPending} size="lg" className="w-full">
                    {uploadMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload {parsedData.length} Certificate(s)
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </AnimatedContainer>

          {/* Upload Result */}
          {uploadResult && (
            <AnimatedContainer>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Upload Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold">{uploadResult.total}</div>
                      <div className="text-sm text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">{uploadResult.successful}</div>
                      <div className="text-sm text-muted-foreground">Successful</div>
                    </div>
                    <div className="text-center p-4 bg-destructive/10 rounded-lg">
                      <div className="text-2xl font-bold text-destructive">{uploadResult.failed}</div>
                      <div className="text-sm text-muted-foreground">Failed</div>
                    </div>
                  </div>

                  {uploadResult.errors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-destructive">Errors:</h4>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {uploadResult.errors.map((error: any, index: number) => (
                          <Alert key={index} variant="destructive" className="py-2">
                            <XCircle className="h-3 w-3" />
                            <AlertDescription className="text-xs">
                              Row {error.row}: {error.error}
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => {
                      setFile(null)
                      setParsedData([])
                      setUploadResult(null)
                    }}
                    className="w-full"
                  >
                    Upload Another File
                  </Button>
                </CardContent>
              </Card>
            </AnimatedContainer>
          )}
        </div>

        {/* Instructions Sidebar */}
        <div className="space-y-6">
          <AnimatedContainer delay={0.1}>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">CSV Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Download our CSV template to ensure your data is formatted correctly.
                </p>
                <Button onClick={downloadTemplate} variant="outline" size="sm" className="w-full bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.15}>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Required Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Student Name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Student ID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Email Address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Program</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Course</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2}>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Make sure your CSV file follows the template format. Invalid rows will be skipped.
              </AlertDescription>
            </Alert>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  )
}
