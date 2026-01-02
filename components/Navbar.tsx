"use client";

import Link from "next/link"
import { useScrolled } from "@/hooks/useScrolled";
import { Button } from "@/components/ui/button"
import {
    Shield,
  } from "lucide-react"

export default function Navbar() {
  const scrolled = useScrolled(50);

  return (
    <nav
      className={`
        sticky top-0 z-50
        border-b
        transition-colors duration-300
        lg:px-10
        ${scrolled ? "bg-white/98 backdrop-blur supports-[backdrop-filter]:bg-background/98" : "bg-white"}
      `}
    >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-bold text-xl">SCVS</span>
            </div>
            <div className="flex items-center gap-3">
                <Link href="/auth/login">
                    <Button variant="ghost" className="border-2">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                    <Button className="">
                        <span className="flex md:hidden">Sign Up</span>
                        <span className="hidden md:flex">Register Institution</span>
                    </Button>
                </Link>
            </div>
        </div>
    </nav>
  );
}
