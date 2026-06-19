export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

interface RouteContext {
    params: Promise<{ id: string }>;
}

const updateWorkoutSchema = z.object({
    name: z.string().min(2).optional(),
});

// GET: Detalle de un entrenamiento con todos sus ejercicios
export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { id } = await context.params;

        const [workout] = await sql`
            SELECT 
                w.*,
                COALESCE(
                    json_agg(
                        jsonb_build_object(
                            'id', we.id,
                            'exercise_id', we.exercise_id,
                            'exercise_name', e.name,
                            'exercise_image', e.image_url,
                            'muscle_group', e.muscle_group,
                            'sets', we.sets,
                            'reps', we.reps,
                            'weight', we.weight,
                            'rest_seconds', we.rest_seconds,
                            'order_index', we.order_index,
                            'notes', we.notes
                        ) ORDER BY we.order_index
                    ) FILTER (WHERE we.id IS NOT NULL),
                    '[]'
                ) as exercises
            FROM workouts w
            LEFT JOIN workout_exercises we ON w.id = we.workout_id
            LEFT JOIN exercises e ON we.exercise_id = e.id
            WHERE w.id = ${id}
            GROUP BY w.id
        `;

        if (!workout) {
            return NextResponse.json({ error: "Entrenamiento no encontrado" }, { status: 404 });
        }

        return NextResponse.json(workout);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Renombrar entrenamiento
export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { id } = await context.params;
        const body = await request.json();
        const { name } = updateWorkoutSchema.parse(body);

        const [updated] = await sql`
            UPDATE workouts 
            SET name = COALESCE(${name}, name), updated_at = CURRENT_TIMESTAMP
            WHERE id = ${id}
            RETURNING *
        `;

        if (!updated) {
            return NextResponse.json({ error: "Entrenamiento no encontrado" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// DELETE: Borrar entrenamiento (cascada a workout_exercises)
export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { id } = await context.params;

        await sql`DELETE FROM workouts WHERE id = ${id}`;

        return NextResponse.json({ success: true, message: "Entrenamiento eliminado" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}