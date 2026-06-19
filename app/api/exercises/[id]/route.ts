export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { id } = await context.params;

        const [exercise] = await sql`
            SELECT * FROM exercises WHERE id = ${id}
        `;

        if (!exercise) {
            return NextResponse.json({ error: 'Ejercicio no encontrado' }, { status: 404 });
        }

        return NextResponse.json(exercise);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}