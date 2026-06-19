export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const updateItemSchema = z.object({
    is_checked: z.boolean(),
});

// ✅ CORREGIDO: Interfaz con params como Promise
interface RouteContext {
    params: Promise<{ itemId: string }>;
}

// PATCH: Cambia el estado (marcado o no) de un ejercicio individual
export async function PATCH(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { itemId } = await context.params;
        const body = await request.json();
        const result = updateItemSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ errors: result.error.format() }, { status: 400 });
        }

        const { is_checked } = result.data;

        const [updatedItem] = await query(
            'UPDATE checklist_items SET is_checked = $1 WHERE id = $2 RETURNING *',
            [is_checked, itemId]
        );

        if (!updatedItem) {
            return NextResponse.json({ error: 'Elemento no encontrado' }, { status: 404 });
        }

        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

// DELETE: Borra un ejercicio suelto usando su ID único
export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { itemId } = await context.params;

        const rows = await query('DELETE FROM checklist_items WHERE id = $1 RETURNING *', [itemId]);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Elemento no encontrado' }, { status: 404 });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}