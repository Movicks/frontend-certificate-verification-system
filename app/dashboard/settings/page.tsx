"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedContainer } from "@/components/animated-container"
import { useAuth } from "@/hooks/use-auth"
import { Building2, Mail, Phone, Globe, MapPin, Save } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const institution = user?.institution

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Settings</h1>
        <p className="text-muted-foreground">Manage your institution profile and preferences</p>
      </div>

      {/* Institution Profile */}
      <AnimatedContainer>
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Institution Profile
            </CardTitle>
            <CardDescription>Update your institution's information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution-name">Institution Name</Label>
                <Input id="institution-name" defaultValue={institution?.name || ""} placeholder="Tech University" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={institution?.email || ""}
                  placeholder="contact@university.edu"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </Label>
                <Input id="phone" type="tel" defaultValue={institution?.phone || ""} placeholder="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  defaultValue={institution?.website || ""}
                  placeholder="https://university.edu"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address
                </Label>
                <Textarea
                  id="address"
                  defaultValue={institution?.address || ""}
                  placeholder="123 Education St, City, State, ZIP"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Account Settings */}
      <AnimatedContainer delay={0.1}>
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account credentials and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" className="bg-transparent">
                Update Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  )
}
