"use client"

import type React from "react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, UploadIcon } from "lucide-react"
import { InputField, SelectField } from "@/components/form-fields"
import { FileUploader } from "@/components/file-uploader"
import { AvatarUploader } from "@/components/avatar-uploader"
import { QRCodeViewer } from "@/components/qr-code-viewer"
import { AnimatedContainer } from "@/components/animated-container"
import { certificatesAPI } from "@/lib/api/certificates-api"
import type { CertificateFormData } from "@/types/forms"

export default function CertificateUploadPage() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    studentEmail: "",
    studentPhone: "",
    program: "",
    course: "",
    session: "",
    year: "",
    issueDate: "",
  })
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null)
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [certificateNumber, setCertificateNumber] = useState<string | null>(null)
  const [generatedQR, setGeneratedQR] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sessionOptions = ["Fall 2023", "Spring 2024", "Summer 2024"]
  const yearOptions = ["2023", "2024", "2025"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFormData({
      studentName: "",
      studentId: "",
      studentEmail: "",
      studentPhone: "",
      program: "",
      course: "",
      session: "",
      year: "",
      issueDate: "",
    })
    setPassportPhoto(null)
    setCertificateFile(null)
    setCertificateNumber(null)
    setGeneratedQR(null)
    setUploadSuccess(false)
    setIsLoading(false)
  }

  const createMutation = useMutation({
    mutationFn: certificatesAPI.createCertificate,
    onSuccess: (data) => {
      setCertificateNumber(data.certificateNumber)
      setGeneratedQR(data.qrCodeUrl)
      setUploadSuccess(true)
      setIsLoading(false)

      // Invalidate queries to refresh certificate list and stats
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] })
    },
    onError: () => {
      setIsLoading(false)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setUploadSuccess(false)

    const certificateData: CertificateFormData = {
      studentName: formData.studentName,
      studentId: formData.studentId,
      email: formData.studentEmail,
      phone: formData.studentPhone,
      program: formData.program,
      course: formData.course,
      session: formData.session,
      year: Number.parseInt(formData.year),
      issueDate: formData.issueDate,
      passportPhoto: passportPhoto ? URL.createObjectURL(passportPhoto) : undefined,
      certificateFile: certificateFile ? URL.createObjectURL(certificateFile) : undefined,
    }

    createMutation.mutate(certificateData)
  }

  if (uploadSuccess && generatedQR && certificateNumber) {
    return (
      <AnimatedContainer>
        <div className="">
          <Card className="border-success">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <CardTitle className="text-2xl">Certificate Uploaded Successfully!</CardTitle>
              <CardDescription>The certificate has been generated and QR code created</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Certificate Number</p>
                <p className="text-xl font-bold text-primary">{certificateNumber}</p>
              </div>

              <div className="flex justify-center">
                <QRCodeViewer qrCodeUrl={generatedQR} certificateNumber={certificateNumber} size="lg" showDownload />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Verification URL:</p>
                <code className="text-xs bg-background p-2 rounded block overflow-x-auto">
                  {`${window.location.origin}/verify/${certificateNumber}`}
                </code>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
                  Upload Another
                </Button>
                <Button onClick={() => (window.location.href = "/dashboard/certificates")} className="flex-1">
                  View All Certificates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedContainer>
    )
  }

  return (
    <AnimatedContainer>
      <div className="max-w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-balance">Upload Certificate</h1>
          <p className="text-muted-foreground mt-1">Create a new certificate with QR code verification</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 grid md:grid-cols-2 gap-4">
            {/* Student Information */}
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                  <CardDescription>Enter the student's personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      label="Student Name"
                      name="studentName"
                      placeholder="John Doe"
                      required
                      value={formData.studentName}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Student ID"
                      name="studentId"
                      placeholder="STD2024001"
                      required
                      value={formData.studentId}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="">
                    <InputField
                      label="Email Address"
                      name="studentEmail"
                      type="email"
                      placeholder="student@example.com"
                      required
                      value={formData.studentEmail}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Phone Number (Optional)"
                      name="studentPhone"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.studentPhone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <AvatarUploader onFileSelect={setPassportPhoto} label="Student Passport Photo (Optional)" />
                </CardContent>
              </Card>

              {/* Certificate Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Details</CardTitle>
                  <CardDescription>Enter the program and course information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      label="Program"
                      name="program"
                      placeholder="Bachelor of Science"
                      required
                      value={formData.program}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Course"
                      name="course"
                      placeholder="Computer Science"
                      required
                      value={formData.course}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <SelectField
                      label="Session"
                      name="session"
                      placeholder="Select session"
                      required
                      options={sessionOptions}
                      value={formData.session}
                      onValueChange={handleSelectChange("session")}
                    />
                    <SelectField
                      label="Year"
                      name="year"
                      required
                      options={yearOptions}
                      value={formData.year}
                      onValueChange={handleSelectChange("year")}
                    />
                    <InputField
                      label="Issue Date"
                      name="issueDate"
                      type="date"
                      required
                      value={formData.issueDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* File Upload */}
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Document</CardTitle>
                  <CardDescription>Upload the official certificate file (PDF, PNG, or JPG)</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploader
                    accept=".pdf,.png,.jpg,.jpeg"
                    maxSize={10}
                    onFileSelect={setCertificateFile}
                    label="Certificate File"
                    preview={true}
                    value={certificateFile}
                  />
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="bg-transparent"
                >
                  Reset Form
                </Button>
                <Button type="submit" disabled={isLoading || !certificateFile} className="flex-1">
                  <UploadIcon className="w-4 h-4 mr-2" />
                  {isLoading ? "Uploading..." : "Upload Certificate"}
                </Button>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </AnimatedContainer>
  )
}
