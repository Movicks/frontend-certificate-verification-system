import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { VerificationPageClient } from "./verification-page-client"
import { mockVerificationData } from "@/lib/mock-data"

export async function generateMetadata({ params }: { params: { certificateId: string } }): Promise<Metadata> {
  // In production, fetch actual certificate data
  const certificateId = await params.certificateId

  return {
    title: `Verify Certificate - ${certificateId}`,
    description: "Official certificate verification by CODAXLAB",
    robots: "index, follow",
  }
}

export default async function VerificationPage({ params }: { params: { certificateId: string } }) {
  // In production, fetch verification data from API
  const certificateId = await params.certificateId

  // Mock API call - replace with actual API
  const verificationData = mockVerificationData

  if (!verificationData) {
    notFound()
  }

  return <VerificationPageClient certificateId={certificateId} verificationData={verificationData} />
}
