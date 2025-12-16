import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const certificateUploadSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  studentId: z.string().min(1, "Student ID is required"),
  studentEmail: z.string().email("Invalid email address"),
  studentPhone: z.string().optional(),
  program: z.string().min(2, "Program is required"),
  course: z.string().min(2, "Course is required"),
  session: z.string().min(1, "Session is required"),
  year: z.number().min(2000).max(2100),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  passportPhoto: z.any().optional(),
  certificateFile: z.any().refine((file) => file !== null, "Certificate file is required"),
  metadata: z.record(z.string(), z.any()).optional(),
})

export type CertificateUploadFormData = z.infer<typeof certificateUploadSchema>
