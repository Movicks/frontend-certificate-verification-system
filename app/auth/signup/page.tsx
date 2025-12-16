"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, AlertCircle, CheckCircle } from "lucide-react"
import { AnimatedContainer } from "@/components/animated-container"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function SignupPage() {
  const { signup, isSigningUp, signupError } = useAuth()

  const [formData, setFormData] = useState({
    institutionName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactName: "",
    phone: "",
    website: "",
    address: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    signup({
      institutionName: formData.institutionName,
      email: formData.email,
      password: formData.password,
      contactName: formData.contactName,
      phone: formData.phone,
      website: formData.website,
      address: formData.address,
    })
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
                    />
                    {errors.institutionName && <p className="text-xs text-destructive">{errors.institutionName}</p>}
                  </div>

                  <div className="space-y-2">
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
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://university.edu"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="123 Education St, City, State, ZIP"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Contact Person</h3>
                <div className="space-y-2">
                  <Label htmlFor="contactName">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    placeholder="John Smith"
                    value={formData.contactName}
                    onChange={handleChange}
                    className={errors.contactName ? "border-destructive" : ""}
                  />
                  {errors.contactName && <p className="text-xs text-destructive">{errors.contactName}</p>}
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
                    />
                    {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Success/Error Messages */}
              {signupError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{signupError.message}</AlertDescription>
                </Alert>
              )}

              <Alert className="border-primary/50 bg-primary/5">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-xs">
                  Your institution will be reviewed by our team. You'll receive approval within 24-48 hours.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full" size="lg" disabled={isSigningUp}>
                {isSigningUp ? "Creating Account..." : "Register Institution"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </form>
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
