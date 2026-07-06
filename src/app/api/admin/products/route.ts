import { NextResponse } from 'next/server'
import { products as staticProducts } from '@/data/products'

// Admin: Get all products (with auth check in production)
export async function GET() {
  return NextResponse.json({
    success: true,
    data: staticProducts,
    total: staticProducts.length,
  })
}

// Admin: Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate
    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      )
    }

    // In production, insert into D1
    return NextResponse.json({
      success: true,
      data: { id: 'prod-' + Date.now(), ...body, createdAt: new Date().toISOString() },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
