import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'CIA Store | Premium Gaming Digital Goods',
  description:
    'CIA Store - Your premium destination for gaming digital goods. Buy accounts, in-game currency, skins, maps and more. Fast delivery, best prices, 100% secure.',
  keywords: [
    'gaming store', 'digital goods', 'game accounts', 'roblox', 'blox fruits',
    'in-game currency', 'skins', 'maps', 'cheap robux', 'gamepasses',
  ],
  authors: [{ name: 'CIA Store' }],
  creator: 'CIA Store',
  publisher: 'CIA Store',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cia-store.pages.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: '/',
    siteName: 'CIA Store',
    title: 'CIA Store | Premium Gaming Digital Goods',
    description: 'Your premium destination for gaming digital goods. Buy accounts, in-game currency, skins, maps and more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CIA Store | Premium Gaming Digital Goods',
    description: 'Your premium destination for gaming digital goods.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050B14',
} as const

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body className={`${inter.variable} ${orbitron.variable}`}>
        <div className="min-h-screen bg-dark bg-grid">
          <div className="fixed inset-0 bg-gradient-conic pointer-events-none" />
          {children}
        </div>
      </body>
    </html>
  )
}
