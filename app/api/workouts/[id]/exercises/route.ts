export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

interface RouteContext {
    params: Promise<{ id: string }>;
}

const addExerciseSchema = z.object({
    exercise_id: z.string().min(1),
    sets: z.number().int().min(1).default(3),
    reps: z.number().int().min(1).default(10),
    weight: z.number().min(0).default(0),
    rest_seconds: z.number().int().min(0).default(60),
    order_index: z.number().int().min(0).default(0),
    notes: z.string().optional(),
});

// POST: Añadir un ejercicio al entrenamiento
export async function POST(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { id: workoutId } = await context.params;
        const body = await request.json();

        // Soportar array o objeto individual
        const items = Array.isArray(body) ? body : [body];
        const results = [];

        for (const item of items) {
            const { exercise_id, sets, reps, weight, rest_seconds, order_index, notes } =
                addExerciseSchema.parse(item);

            const [record] = await sql`
                INSERT INTO workout_exercises 
                    (workout_id, exercise_id, sets, reps, weight, rest_seconds, order_index, notes)
                VALUES 
                    (${workoutId}, ${exercise_id}, ${sets}, ${reps}, ${weight}, ${rest_seconds}, ${order_index}, ${notes || null})
                RETURNING *
            `;
            results.push(record);
        }

        return NextResponse.json(
            { count: results.length, exercises: results },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// PUT: Reemplazar/actualizar todos los ejercicios de un entrenamiento
export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { id: workoutId } = await context.params;
        const body = await request.json();

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: "El cuerpo debe ser un array de ejercicios" }, { status: 400 });
        }

        // Eliminar todos los ejercicios existentes para este entrenamiento
        await sql`
            DELETE FROM workout_exercises 
            WHERE workout_id = ${workoutId}
        `;

        const results = [];

        for (const item of body) {
            const { exercise_id, sets, reps, weight, rest_seconds, order_index, notes } =
                addExerciseSchema.parse(item);

            const [record] = await sql`
                INSERT INTO workout_exercises 
                    (workout_id, exercise_id, sets, reps, weight, rest_seconds, order_index, notes)
                VALUES 
                    (${workoutId}, ${exercise_id}, ${sets}, ${reps}, ${weight}, ${rest_seconds}, ${order_index}, ${notes || null})
                RETURNING *
            `;
            results.push(record);
        }

        return NextResponse.json(
            { count: results.length, exercises: results },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}