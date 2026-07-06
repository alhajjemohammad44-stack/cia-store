// Middleware for CSRF protection, rate limiting, and security headers

import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in-memory, for edge-compatible use in production use KV)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Clean rate limit map periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key)
    }
  }
}, 60000)

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 60 // requests per window

// Allowed origins for CSRF
const ALLOWED_ORIGINS = [
  'https://cia-store.pages.dev',
  'https://cia-store.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
]

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // ─── 1. Security Headers ───────────────────────────
  // Already handled in next.config.js for static responses,
  // but ensure them for all responses including API
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // ─── 2. CSRF Protection for API routes ────────────
  if (pathname.startsWith('/api/') && request.method !== 'GET') {
    const origin = request.headers.get('origin') || ''
    const referer = request.headers.get('referer') || ''

    // Check if origin/referer is allowed
    const isAllowed = ALLOWED_ORIGINS.some(
      (allowed) =>
        origin.startsWith(allowed) || referer.startsWith(allowed)
    )

    if (!isAllowed && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: 'CSRF validation failed' },
        { status: 403 }
      )
    }

    // Add CSRF token validation for mutating requests
    const csrfToken = request.headers.get('x-csrf-token')
    const cookieToken = request.cookies.get('csrf-token')?.value

    if (process.env.NODE_ENV === 'production' && csrfToken && cookieToken) {
      if (csrfToken !== cookieToken) {
        return NextResponse.json(
          { success: false, error: 'Invalid CSRF token' },
          { status: 403 }
        )
      }
    }
  }

  // ─── 3. Rate Limiting ────────────────────────────
  if (pathname.startsWith('/api/')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const now = Date.now()
    const rateData = rateLimitMap.get(ip)

    if (!rateData || rateData.resetTime < now) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    } else {
      rateData.count++
      if (rateData.count > RATE_LIMIT_MAX) {
        return NextResponse.json(
          {
            success: false,
            error: 'Too many requests. Please try again later.',
            retryAfter: Math.ceil((rateData.resetTime - now) / 1000),
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(Math.ceil((rateData.resetTime - now) / 1000)),
            },
          }
        )
      }
    }
  }

  // ─── 4. API Response Headers ──────────────────────
  if (pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex')
    response.headers.set('X-Api-Version', '1.0.0')
  }

  return response
}

// Match all routes except static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|icons/|manifest.json|robots.txt).*)',
  ],
}
