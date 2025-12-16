import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes and their allowed roles
const protectedRoutes = {
  "/dashboard": ["institution_admin"],
  "/student": ["student"],
  "/admin": ["super_admin"],
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes - allow access
  if (
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next()
  }

  // Check if route is protected
  const protectedPath = Object.keys(protectedRoutes).find((path) => pathname.startsWith(path))

  if (protectedPath) {
    // In production, you would verify JWT from httpOnly cookie
    // For demo, check localStorage via client-side redirect
    const response = NextResponse.next()

    // Add header to trigger client-side auth check
    response.headers.set("x-auth-required", "true")
    response.headers.set("x-allowed-roles", JSON.stringify(protectedRoutes[protectedPath]))

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
}
