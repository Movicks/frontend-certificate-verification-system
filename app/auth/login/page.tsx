"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertCircle, Building2, GraduationCap } from "lucide-react"
import { AnimatedContainer } from "@/components/animated-container"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isAuthenticated, status, error } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("institution")
  const [formError, setFormError] = useState<string | null>(null)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get("redirect")
      router.push(redirect || "/dashboard")
    }
  }, [isAuthenticated, router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    // Basic client-side validation to avoid server-side validator errors
    const validEmail = /\S+@\S+\.\S+/.test(email)
    if (!validEmail || !password || password.length < 8) {
      setFormError("Please enter a valid email and a password of at least 8 characters.")
      return
    }

    try {
      await login(email, password)
      const redirect = searchParams.get("redirect")
      router.push(redirect || "/dashboard")
    } catch (err: any) {
      // Thunk unwrap error; surface generic message. Detailed backend messages show in `error` below.
      setFormError(err?.message ?? "Login failed")
    }
  }

  const demoAccounts = {
    institution: {
      email: "admin@institution.com",
      label: "Institution Admin",
    },
    student: {
      email: "student@example.com",
      label: "Student",
    },
  }

  const isLoggingIn = status === "loading"
  const loginErrorMessage = formError || error || null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <AnimatedContainer className="w-full max-w-md">
        <Card className="border-2">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">Welcome to SCVS</CardTitle>
              <CardDescription>Sign in to your account</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="institution" className="text-xs">
                  <Building2 className="w-3 h-3 mr-1" />
                  Institution
                </TabsTrigger>
                <TabsTrigger value="student" className="text-xs">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  Student
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={demoAccounts[activeTab].email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {loginErrorMessage && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{String(loginErrorMessage)}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoggingIn}>
                    {isLoggingIn ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {activeTab === "institution" && (
              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                  Register your institution
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to home
          </Link>
        </div>
      </AnimatedContainer>
    </div>
  )
}
