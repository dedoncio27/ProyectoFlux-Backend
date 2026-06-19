export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { query } from '../../../../../lib/db';
import { z } from 'zod';

const itemSchema = z.object({
    text: z.string().min(1, "El texto no puede estar vacío"),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const items = await query('SELECT * FROM checklist_items WHERE note_id = $1', [id]);
        return NextResponse.json(items, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();
        const result = itemSchema.safeParse(body);
        if (!result.success) return NextResponse.json({ errors: result.error.format() }, { status: 400 });

        const { text } = result.data;
        const [newItem] = await query(
            'INSERT INTO checklist_items (note_id, text) VALUES ($1, $2) RETURNING *',
            [id, text]
        );
        return NextResponse.json(newItem, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}