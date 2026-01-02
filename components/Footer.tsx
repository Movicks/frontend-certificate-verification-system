import Link from "next/link"
import React from 'react'
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

export default function Footer() {
  return (
    <footer className="pt-12 pb-5 lg:px-10 bg-background border-t">
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

          <div className="mt-4 pt-3 md:mt-5 md:pt-5 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 SCVS. All rights reserved. Built with security and trust.</p>
          </div>
        </div>
      </footer>
  )
}
