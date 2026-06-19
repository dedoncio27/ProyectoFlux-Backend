export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const noteSchema = z.object({
    title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    type: z.enum(['note', 'checklist', 'idea']),
    content: z.string().optional(),
    color: z.string().optional(),
    user_id: z.string(),
});

// GET: Listar todas las notas/rutinas filtradas por el usuario actual
export async function GET(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: "Falta el parámetro userId" }, { status: 400 });
        }

        const data = await sql`
            SELECT 
                n.*,
                COALESCE(
                    json_agg(DISTINCT jsonb_build_object('id', ci.id, 'title', ci.title, 'is_checked', ci.is_checked)) 
                    FILTER (WHERE ci.id IS NOT NULL), '[]'
                ) as checklist_items,
                COALESCE(
                    json_agg(DISTINCT jsonb_build_object('id', t.id, 'name', t.name, 'color', t.color)) 
                    FILTER (WHERE t.id IS NOT NULL), '[]'
                ) as tags
            FROM notes n
            LEFT JOIN checklist_items ci ON n.id = ci.note_id
            LEFT JOIN note_tags nt ON n.id = nt.note_id
            LEFT JOIN tags t ON nt.tag_id = t.id
            WHERE n.user_id = ${userId}
            GROUP BY n.id
            ORDER BY n.created_at DESC;
        `;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Crear una nueva nota/rutina vinculada al usuario de Firebase
export async function POST(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const body = await request.json();

        const { title, type, content, color, user_id } = noteSchema.parse(body);

        const [newNote] = await sql`
            INSERT INTO notes (title, type, content, color, user_id)
            VALUES (${title}, ${type}, ${content || ''}, ${color || '#ffffff'}, ${user_id})
            RETURNING *
        `;

        return NextResponse.json(newNote, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}