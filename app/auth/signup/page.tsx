"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, AlertCircle, CheckCircle } from "lucide-react"
import { AnimatedContainer } from "@/components/animated-container"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function SignupPage() {
  const { signup, isLoading, error } = useAuth()

  const [formData, setFormData] = useState({
    institutionName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accreditationId: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[e.target.name]
        return newErrors
      })
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.institutionName.trim()) {
      newErrors.institutionName = "Institution name is required"
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required"
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.accreditationId.trim()) {
      newErrors.accreditationId = "Accreditation ID is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    try {
      await signup({
        institutionName: formData.institutionName,
        email: formData.email,
        password: formData.password,
        accreditationId: formData.accreditationId,
      })
      // On successful signup, route to login page for explicit sign-in
      window.location.href = "/auth/login"
    } catch (err: any) {
      // Show backend validation errors in the form alert
      setErrors((prev) => ({ ...prev }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4 py-12">
      <AnimatedContainer className="w-full max-w-2xl">
        <Card className="border-2">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">Register Your Institution</CardTitle>
              <CardDescription>Join the secure certificate verification network</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Institution Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Institution Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="institutionName">
                      Institution Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="institutionName"
                      name="institutionName"
                      placeholder="Tech University"
                      value={formData.institutionName}
                      onChange={handleChange}
                      className={errors.institutionName ? "border-destructive" : ""}
                      autoComplete="institutionName"
                    />
                    {errors.institutionName && <p className="text-xs text-destructive">{errors.institutionName}</p>}
                  </div>

                  <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="email">
                        Institution Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="contact@university.edu"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-destructive" : ""}
                        autoComplete="email"
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2 w-full">
                      <Label htmlFor="accreditationId">
                        Accreditation ID <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="accreditationId"
                        name="accreditationId"
                        placeholder="ACC-12345"
                        value={formData.accreditationId}
                        onChange={handleChange}
                        className={errors.accreditationId ? "border-destructive" : ""}
                        autoComplete="accreditationId"
                      />
                      {errors.accreditationId && (
                        <p className="text-xs text-destructive">{errors.accreditationId}</p>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Account Security */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Account Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "border-destructive" : ""}
                      autoComplete="password"
                    />
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "border-destructive" : ""}
                      autoComplete="password"
                    />
                    {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Success/Error Messages */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert className="border-primary/50 bg-primary/5">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-xs">
                  Your institution will be reviewed by our team. You'll receive approval within 24-48 hours.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register Institution"}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                Already have an account? <Link href="/auth/login" className="text-primary hover:underline">Log in</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  )
}
