export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle CORS preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
    try {
        const { userId, priceId } = await request.json();

        if (!userId || !priceId) {
            return NextResponse.json(
                { error: 'Faltan userId o priceId' },
                { status: 400, headers: corsHeaders }
            );
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment', // Pago único
            success_url: 'https://flux-backend.vercel.app/payment/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://flux-backend.vercel.app/payment/cancel',
            metadata: {
                userId: userId,
            },
        });

        return NextResponse.json({
            sessionId: session.id,
            url: session.url,
        }, { headers: corsHeaders });
    } catch (error: any) {
        console.error('Error creando checkout:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}