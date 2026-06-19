export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

interface RouteContext {
    params: Promise<{ userId: string }>;
}

export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { userId } = await context.params;

        const [subscription] = await sql`
            SELECT status, plan_type, stripe_session_id 
            FROM subscriptions 
            WHERE user_id = ${userId}
        `;

        if (!subscription) {
            return NextResponse.json({
                plan_type: 'free',
                status: 'none',
                isPremium: false
            });
        }

        return NextResponse.json({
            ...subscription,
            isPremium: subscription.plan_type === 'premium' && subscription.status === 'active',
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}