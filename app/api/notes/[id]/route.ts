export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const updateNoteSchema = z.object({
    title: z.string().min(3).optional(),
    type: z.enum(['note', 'checklist', 'idea']).optional(),
    content: z.string().optional(),
    color: z.string().optional(),
});

// ✅ CORREGIDO: Interfaz con params como Promise, SIN desestructurar en la firma
interface RouteContext {
    params: Promise<{ id: string }>;
}

// DELETE: Borrar una nota
export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { id } = await context.params;

        await sql`DELETE FROM notes WHERE id = ${id}`;

        return NextResponse.json({ success: true, message: "Nota eliminada correctamente" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Modificar una nota
export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { id } = await context.params;

        const body = await request.json();
        const { title, type, content, color } = updateNoteSchema.parse(body);

        const [updatedNote] = await sql`
            UPDATE notes
            SET 
                title = COALESCE(${title}, title),
                type = COALESCE(${type}, type),
                content = COALESCE(${content}, content),
                color = COALESCE(${color}, color),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${id}
            RETURNING *
        `;

        if (!updatedNote) {
            return NextResponse.json({ error: "Nota no encontrada" }, { status: 404 });
        }

        return NextResponse.json(updatedNote);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}