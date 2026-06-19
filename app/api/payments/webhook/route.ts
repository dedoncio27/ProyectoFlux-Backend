export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { neon } from '@neondatabase/serverless';

export async function POST(request: NextRequest) {
    const payload = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
        return NextResponse.json(
            { error: 'Falta firma del webhook' },
            { status: 400 }
        );
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json(
            { error: `Webhook Error: ${err.message}` },
            { status: 400 }
        );
    }

    // Manejar el evento
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const userId = session.metadata?.userId;

        if (userId) {
            const sql = neon(process.env.DATABASE_URL!);

            try {
                await sql`
                    INSERT INTO subscriptions (user_id, status, plan_type, stripe_session_id)
                    VALUES (${userId}, 'active', 'premium', ${session.id})
                    ON CONFLICT (user_id) 
                    DO UPDATE SET 
                        status = 'active',
                        plan_type = 'premium',
                        stripe_session_id = ${session.id},
                        updated_at = CURRENT_TIMESTAMP
                `;

                console.log(`✅ Premium activado para usuario: ${userId}`);
            } catch (dbError: any) {
                console.error('Error actualizando BD:', dbError);
                return NextResponse.json(
                    { error: 'Error actualizando suscripción' },
                    { status: 500 }
                );
            }
        }
    }

    return NextResponse.json({ received: true });
}