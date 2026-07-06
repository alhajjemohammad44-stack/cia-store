// Auth configuration - placeholder for production
// In production, install: next-auth @auth/d1-adapter resend
// and uncomment the full implementation

/*
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Resend from 'next-auth/providers/resend'
import { D1Adapter } from '@auth/d1-adapter'
import type { D1Database } from '@cloudflare/workers-types'
*/

export type UserRole = 'customer' | 'admin' | 'superadmin'

export interface AuthUser {
  id: string
  email: string
  name: string
  image?: string
  role: UserRole
}

// Password hashing with Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Placeholder for NextAuth config
export function getAuthConfig() {
  return {
    providers: [],
    session: { strategy: 'jwt' as const },
    pages: {
      signIn: '/auth/login',
      newUser: '/auth/register',
    },
  }
}
