'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Zap, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Auth logic here
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-electric/20 to-neon-purple/20 border border-electric/30 flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-electric" />
              </div>
              <h1 className="text-3xl font-heading font-black text-white">
                Welcome Back
              </h1>
              <p className="text-white/50 mt-2">Sign in to your CIA Store account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-dark-100 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-12 rounded-xl bg-dark-100 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white/40">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-dark-100 accent-electric" />
                  Remember me
                </label>
                <Link href="/auth/forgot-password" className="text-electric hover:text-electric-400 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" size="xl" className="w-full gap-2 shadow-[0_0_30px_rgba(0,163,255,0.3)]" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-xs text-white/30">or continue with</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </Button>
              <Button variant="outline" className="gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-white/40 mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-electric hover:text-electric-400 font-bold transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
