"use client"

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
import { useEffect } from "react"

export function useAuth() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUserThunk())
    }
  }, [dispatch])

  const login = (credentials: { email: string; password: string }) => {
    dispatch(loginThunk(credentials)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        const data = res.payload
        if (data.user.role === "institution_admin") {
          if (data.user.institution?.status === "pending") {
            router.push("/dashboard/pending-approval")
          } else {
            router.push("/dashboard")
          }
        } else if (data.user.role === "student") {
          router.push("/student/dashboard")
        } else if (data.user.role === "super_admin") {
          router.push("/admin/dashboard")
        }
      }
    })
  }

  const signup = (data: any) => {
    dispatch(signupThunk(data)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        router.push("/dashboard/pending-approval")
      }
    })
  }

  const logout = () => {
    dispatch(logoutThunk()).then(() => {
      router.push("/auth/login")
    })
  }

  return {
    user,
    isLoading: status === "loading",
    isAuthenticated,
    login,
    signup,
    logout,
    isLoggingIn: status === "loading",
    isSigningUp: status === "loading",
    loginError: error ? new Error(error) : undefined,
    signupError: error ? new Error(error) : undefined,
  }
}

export function useRequireAuth(allowedRoles?: User["role"][]) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  if (!isLoading && !user) {
    router.push("/auth/login")
    return null
  }

  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    router.push("/")
    return null
  }

  return user
}
