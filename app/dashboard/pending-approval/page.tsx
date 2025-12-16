"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, CheckCircle, Mail, Phone } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { AnimatedContainer } from "@/components/animated-container"

export default function PendingApprovalPage() {
  const { user, logout } = useAuth()

  return (
    <AuthGuard allowedRoles={["institution_admin"]}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <AnimatedContainer className="w-full max-w-2xl">
          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-warning" />
              </div>
              <div>
                <CardTitle className="text-2xl">Application Under Review</CardTitle>
                <CardDescription>Your institution registration is being processed</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-primary/50 bg-primary/5">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription>
                  Thank you for registering <strong>{user?.institution?.name}</strong> with SCVS.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold">What happens next?</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                      1
                    </div>
                    <p>Our verification team will review your institution details and credentials</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                      2
                    </div>
                    <p>You'll receive an email notification once your account is approved</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                      3
                    </div>
                    <p>After approval, you can start issuing verified certificates immediately</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                <h4 className="text-sm font-semibold">Expected Timeline</h4>
                <p className="text-sm text-muted-foreground">Typically 24-48 hours during business days</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Need help?</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    support@scvs.com
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    +1 (555) 123-4567
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="ghost" onClick={() => logout()} className="w-full">
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>
    </AuthGuard>
  )
}
