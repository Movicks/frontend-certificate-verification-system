"use client"

import type { AuthResponse, LoginCredentials, SignupData, User } from "@/types/auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// Minimal token helpers kept for backward compatibility (not used in secure flow)
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return null // tokens are managed via httpOnly cookies on the server
}

export function setAuthToken(_token: string): void {
  // No-op: do not store tokens client-side
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user_data")
  }
}

// Get current user from storage (non-sensitive persistence)
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userData = localStorage.getItem("user_data")
  return userData ? JSON.parse(userData) : null
}

// Set current user in storage (non-sensitive persistence)
export function setCurrentUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("user_data", JSON.stringify(user))
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  })

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`
    try {
      const err = await res.json()
      message = err?.message || message
    } catch (_) {}
    throw new Error(message)
  }

  // Some endpoints may return empty body (e.g., logout)
  const contentType = res.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    // @ts-expect-error allow void
    return undefined
  }
  return (await res.json()) as T
}

// Auth API functions
export const authAPI = {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const data = await request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
    // Server sets httpOnly cookie; persist non-sensitive user profile
    setCurrentUser(data.user)
    return data
  },

  // Signup (Institution Admin by default)
  async signup(data: SignupData): Promise<AuthResponse> {
    const res = await request<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    })
    setCurrentUser(res.user)
    return res
  },

  // Logout
  async logout(): Promise<void> {
    await request<void>("/auth/logout", { method: "POST" })
    removeAuthToken() // clears local user_data
  },

  // Get current user (verify session via cookie)
  async getCurrentUser(): Promise<User> {
    try {
      const user = await request<User>("/auth/me", { method: "GET" })
      setCurrentUser(user)
      return user
    } catch (e: any) {
      // Attempt refresh if unauthorized
      if (e?.message?.toLowerCase().includes("401") || e?.message?.toLowerCase().includes("unauthorized")) {
        try {
          await request<void>("/auth/refresh", { method: "POST" })
          const user = await request<User>("/auth/me", { method: "GET" })
          setCurrentUser(user)
          return user
        } catch (refreshErr) {
          removeAuthToken()
          throw refreshErr
        }
      }
      throw e
    }
  },
}
