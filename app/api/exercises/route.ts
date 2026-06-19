export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const exerciseSchema = z.object({
    id: z.string().min(1).max(50),       // "EX-10239"
    name: z.string().min(2).max(255),    // "Press banca"
    muscle_group: z.string().min(2),     // "Pectoral"
    image_url: z.string().url().optional().or(z.literal('')),
});

// GET: Listar ejercicios (filtrar por grupo muscular opcional)
export async function GET(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { searchParams } = new URL(request.url);
        const muscleGroup = searchParams.get('muscle');

        let data;
        if (muscleGroup) {
            data = await sql`
                SELECT * FROM exercises 
                WHERE muscle_group = ${muscleGroup}
                ORDER BY name ASC
            `;
        } else {
            data = await sql`SELECT * FROM exercises ORDER BY name ASC`;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Crear nuevo ejercicio (para subir en batch o uno a uno)
export async function POST(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const body = await request.json();

        // Soportar array para subir muchos de golpe, o objeto individual
        const exercises = Array.isArray(body) ? body : [body];

        const results = [];
        for (const item of exercises) {
            const { id, name, muscle_group, image_url } = exerciseSchema.parse(item);

            const [exercise] = await sql`
                INSERT INTO exercises (id, name, muscle_group, image_url)
                VALUES (${id}, ${name}, ${muscle_group}, ${image_url || null})
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    muscle_group = EXCLUDED.muscle_group,
                    image_url = EXCLUDED.image_url
                RETURNING *
            `;
            results.push(exercise);
        }

        return NextResponse.json(
            { count: results.length, exercises: results },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}