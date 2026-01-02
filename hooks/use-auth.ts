"use client"

import {useEffect} from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch } from "@/store/store"
import {
  loginThunk,
  signupThunk,
  logoutThunk,
  getCurrentUserThunk,
  selectUser,
  selectIsAuthenticated,
  selectAuthStatus,
  selectAuthError,
} from "@/store/slices/authSlice"
import type { User } from "@/types/auth"

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)

  const login = async (email: string, password: string) => {
    return dispatch(loginThunk({ email, password })).unwrap()
  }

  const signup = async (
    data: Omit<User, "id" | "createdAt" | "institution" | "institutionId" | "studentId"> & {
      institutionName?: string
      accreditationId?: string
      password: string
    },
  ) => {
    return dispatch(
      signupThunk({
        email: data.email,
        password: data.password,
        institutionName: data.institutionName || "",
        accreditationId: data.accreditationId || "",
      }),
    ).unwrap()
  }

  const logout = async () => {
    return dispatch(logoutThunk()).unwrap()
  }

  return {
    user,
    isAuthenticated,
    status,
    error,
    login,
    signup,
    logout,
    isLoading: status === "loading",
  }
}

// Client-side route protection without role dependency
export function useRequireAuth(allowedRoles?: never[]) {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Resolve session only on protected routes
  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUserThunk())
    }
  }, [dispatch, user])

  if (!isLoading && !user) {
    router.push("/auth/login")
    return null
  }

  return user
}
