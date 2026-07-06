import { NextResponse } from 'next/server'
import { products } from '@/data/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const slug = searchParams.get('slug')
  const limit = parseInt(searchParams.get('limit') || '100')

  let filtered = [...products]

  if (category) {
    filtered = filtered.filter(p => p.categorySlug === category)
  }

  if (slug) {
    filtered = filtered.filter(p => p.slug === slug)
  }

  filtered = filtered.slice(0, limit)

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  })
}
