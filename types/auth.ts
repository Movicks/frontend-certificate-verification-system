export type UserRole = "institution_admin" | "student" | "super_admin"

export type InstitutionStatus = "pending" | "approved" | "rejected" | "suspended"

export interface Institution {
  id: string
  name: string
  email: string
  logo?: string
  website?: string
  address?: string
  phone?: string
  status: InstitutionStatus
  approvedAt?: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  institutionId?: string
  institution?: Institution
  studentId?: string
  photoUrl?: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  institutionName: string
  email: string
  password: string
  accreditationId: string
}
