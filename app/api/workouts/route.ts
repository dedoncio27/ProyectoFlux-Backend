export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const createWorkoutSchema = z.object({
    name: z.string().min(2).max(255),
    user_id: z.string().min(1), // Email o UID de Firebase
});

// GET: Listar entrenamientos de un usuario
export async function GET(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: "Falta el parámetro userId" }, { status: 400 });
        }

        let workouts = await sql`
            SELECT 
                w.*,
                COALESCE(
                    json_agg(
                        jsonb_build_object(
                            'id', we.id,
                            'exercise_id', we.exercise_id,
                            'exercise_name', e.name,
                            'exercise_image', e.image_url,
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
            WHERE w.user_id = ${userId}
            GROUP BY w.id
            ORDER BY w.created_at DESC
        `;

        // Si el usuario no tiene entrenamientos y no es el usuario por defecto, migrar los de "usuario@email.com"
        if (workouts.length === 0 && userId !== 'usuario@email.com') {
            const defaultWorkouts = await sql`
                SELECT id FROM workouts WHERE user_id = 'usuario@email.com'
            `;
            
            if (defaultWorkouts.length > 0) {
                // Actualizar los entrenamientos del usuario por defecto al usuario actual
                await sql`
                    UPDATE workouts 
                    SET user_id = ${userId}, updated_at = CURRENT_TIMESTAMP
                    WHERE user_id = 'usuario@email.com'
                `;

                // Volver a consultar
                workouts = await sql`
                    SELECT 
                        w.*,
                        COALESCE(
                            json_agg(
                                jsonb_build_object(
                                    'id', we.id,
                                    'exercise_id', we.exercise_id,
                                    'exercise_name', e.name,
                                    'exercise_image', e.image_url,
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
                    WHERE w.user_id = ${userId}
                    GROUP BY w.id
                    ORDER BY w.created_at DESC
                `;
            }
        }

        return NextResponse.json(workouts);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Crear un nuevo entrenamiento
export async function POST(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const body = await request.json();
        const { name, user_id } = createWorkoutSchema.parse(body);

        const [workout] = await sql`
            INSERT INTO workouts (name, user_id)
            VALUES (${name}, ${user_id})
            RETURNING *
        `;

        return NextResponse.json(workout, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}