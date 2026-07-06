import { NextResponse } from 'next/server'

// Stripe Payment Intent creation
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In production, create Stripe PaymentIntent
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(body.amount * 100),
    //   currency: 'usd',
    //   metadata: { orderId: body.orderId },
    // })

    return NextResponse.json({
      success: true,
      clientSecret: 'pi_mock_secret_' + Date.now(),
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
