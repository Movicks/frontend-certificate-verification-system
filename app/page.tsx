import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Search,
  Lock,
  CheckCircle,
  Building2,
  GraduationCap,
  Briefcase,
  QrCode,
  Globe,
  Zap,
  ArrowRight,
  BadgeCheck,
  FileCheck,
} from "lucide-react"
import { AnimatedContainer, SlideIn } from "@/components/animated-container"

export default function HomePage() {
  return (
    <div className="min-h-auto">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">SCV</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Register Institution</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <AnimatedContainer className="text-center max-w-[83rem] mx-auto space-y-8">
            <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-6">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight break-words text-center">
              Secure Certificate Verification <span className="text-primary">System</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Government-grade security for digital certificates. Verify authenticity instantly with QR codes and
              blockchain-backed integrity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button size="lg" className="gap-2 text-base px-8 w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/verify/cert-001" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 bg-transparent w-full sm:w-auto">
                  <Search className="w-5 h-5" />
                  Verify Certificate
                </Button>
              </Link>
            </div>

            {/* Quick Verify */}
            <div className="pt-8 max-w-md mx-auto">
              <div className="flex gap-2">
                <Input placeholder="Enter certificate number..." className="h-12" />
                <Button size="lg" className="h-12">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              {/* <p className="text-xs text-muted-foreground mt-2">
                Try demo: CERT-2024-001, CERT-2024-002, or CERT-2024-003
              </p> */}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Built on Trust & Security</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Military-grade encryption and digital signatures ensure every certificate is authentic and tamper-proof
            </p>
          </AnimatedContainer>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <SlideIn delay={0.1} direction="up">
              <Card className="border-2 text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Lock className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Digital Signatures</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Cryptographic signatures verify authenticity and prevent unauthorized modifications
                  </CardDescription>
                </CardContent>
              </Card>
            </SlideIn>

            <SlideIn delay={0.2} direction="up">
              <Card className="border-2 text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center mb-4">
                    <BadgeCheck className="w-7 h-7 text-success" />
                  </div>
                  <CardTitle className="text-xl">Integrity Checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Real-time tamper detection alerts you immediately if certificate data is compromised
                  </CardDescription>
                </CardContent>
              </Card>
            </SlideIn>

            <SlideIn delay={0.3} direction="up">
              <Card className="border-2 text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-14 h-14 bg-info/10 rounded-xl flex items-center justify-center mb-4">
                    <FileCheck className="w-7 h-7 text-info" />
                  </div>
                  <CardTitle className="text-xl">Audit Trail</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Complete verification history with timestamps, IP addresses, and access logs
                  </CardDescription>
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Three simple steps to secure certificate verification
            </p>
          </AnimatedContainer>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            <SlideIn delay={0.1} direction="up">
              <div className="relative">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                    <QrCode className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Scan QR Code</h3>
                  <p className="text-muted-foreground">
                    Use any smartphone camera to scan the QR code on the certificate
                  </p>
                </div>
              </div>
            </SlideIn>

            <SlideIn delay={0.2} direction="up">
              <div className="relative">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Verify Instantly</h3>
                  <p className="text-muted-foreground">
                    Our system checks digital signatures and validates certificate data
                  </p>
                </div>
              </div>
            </SlideIn>

            <SlideIn delay={0.3} direction="up">
              <div className="relative">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Trust Results</h3>
                  <p className="text-muted-foreground">
                    Get comprehensive verification details including issue date and authenticity
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Role-Based Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">For Every Stakeholder</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Trusted by institutions, employers, and students worldwide
            </p>
          </AnimatedContainer>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <SlideIn delay={0.1} direction="up">
              <Card className="border-2 h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Institutions</CardTitle>
                  <CardDescription className="text-base">Educational organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Issue verified certificates instantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Bulk upload for large batches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Track verification analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Revoke certificates if needed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </SlideIn>

            <SlideIn delay={0.2} direction="up">
              <Card className="border-2 h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6 text-success" />
                  </div>
                  <CardTitle className="text-2xl">Employers</CardTitle>
                  <CardDescription className="text-base">HR and recruitment teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Verify candidate credentials instantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Eliminate fraudulent certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Speed up hiring process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Access complete audit trails</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </SlideIn>

            <SlideIn delay={0.3} direction="up">
              <Card className="border-2 h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-info" />
                  </div>
                  <CardTitle className="text-2xl">Students</CardTitle>
                  <CardDescription className="text-base">Certificate holders</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Access certificates anytime, anywhere</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Share verification links easily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Download PDF copies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Track who verified your certificate</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Why Choose SCVS?</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Enterprise-grade features for institutions of all sizes
            </p>
          </AnimatedContainer>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Globe, title: "Global Access", desc: "Verify from anywhere, anytime" },
              { icon: Zap, title: "Instant Verification", desc: "Real-time validation in seconds" },
              { icon: Lock, title: "Bank-Level Security", desc: "Military-grade encryption" },
              { icon: CheckCircle, title: "99.9% Uptime", desc: "Always available when you need it" },
            ].map((feature, index) => (
              <SlideIn key={feature.title} delay={0.1 + index * 0.05} direction="up">
                <Card className="border-2 text-center h-full">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedContainer className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">Ready to Get Started?</h2>
            <p className="text-lg text-primary-foreground/80 text-balance">
              Join thousands of institutions using SCVS for secure certificate verification
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="gap-2 text-base px-8 w-full md:max-w-[20rem]">
                  Register Your Institution
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base px-8 border-primary-foreground/20 bg-gray-100/20 w-full md:max-w-[20rem]"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">SCVS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure Certificate Verification System - Trusted by institutions worldwide
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/signup" className="hover:text-foreground transition-colors">
                    Register Institution
                  </Link>
                </li>
                <li>
                  <Link href="/verify/cert-001" className="hover:text-foreground transition-colors">
                    Verify Certificate
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 SCVS. All rights reserved. Built with security and trust.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
