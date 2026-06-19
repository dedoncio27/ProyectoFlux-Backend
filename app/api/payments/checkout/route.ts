export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        const { userId, priceId } = await request.json();

        if (!userId || !priceId) {
            return NextResponse.json(
                { error: 'Faltan userId o priceId' },
                { status: 400 }
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
            success_url: 'https://flux-backend-e9flgx4cc-adrians-projects-3ead0681.vercel.app/payment/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://flux-backend-e9flgx4cc-adrians-projects-3ead0681.vercel.app/payment/cancel',
            metadata: {
                userId: userId,
            },
        });

        return NextResponse.json({
            sessionId: session.id,
            url: session.url,
        });
    } catch (error: any) {
        console.error('Error creando checkout:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}