/// <reference types="@cloudflare/workers-types" />

declare namespace NodeJS {
  interface ProcessEnv {
    DB: D1Database
    R2: R2Bucket
    AUTH_SECRET: string
    AUTH_TRUST_HOST: string
    RESEND_API_KEY: string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
    STRIPE_SECRET_KEY: string
    STRIPE_WEBHOOK_SECRET: string
    PAYPAL_CLIENT_ID: string
    PAYPAL_CLIENT_SECRET: string
    USDT_WALLET_ADDRESS: string
    NEXT_PUBLIC_SITE_URL: string
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database
      R2: R2Bucket
    }
  }
}

export {}
