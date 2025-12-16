import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"
import { AnimatedContainer } from "@/components/animated-container"

export default function AdminSettingsPage() {
  return (
    <AnimatedContainer>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your certificate management system</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Settings page coming soon</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Configuration options will be available here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedContainer>
  )
}
