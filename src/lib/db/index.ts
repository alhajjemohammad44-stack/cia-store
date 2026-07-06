// Database client - placeholder for Cloudflare D1 + Drizzle ORM
// In production, install: drizzle-orm @cloudflare/workers-types
// and configure D1 binding in wrangler.toml

/*
import { drizzle } from 'drizzle-orm/d1'
import type { D1Database } from '@cloudflare/workers-types'

let dbInstance: ReturnType<typeof drizzle> | null = null

export function getDb(db: D1Database) {
  if (!dbInstance) {
    dbInstance = drizzle(db)
  }
  return dbInstance
}
*/

export * from './schema'
