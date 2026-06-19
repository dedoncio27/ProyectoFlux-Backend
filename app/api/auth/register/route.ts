export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

// Solo le pedimos al móvil el id que le dio Firebase, el email y el nombre
const syncUserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const body = await req.json();
        const { id, email, name } = syncUserSchema.parse(body);

        // Guardamos el usuario en nuestra base de datos relacional usando el ID de Firebase
        const [user] = await sql`
      INSERT INTO users (id, email, name)
      VALUES (${id}, ${email}, ${name})
      ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name
      RETURNING id, email, name
    `;

        // Le creamos su registro de suscripción por defecto si no existe
        await sql`
      INSERT INTO subscriptions (user_id, status, plan_type)
      VALUES (${id}, 'active', 'free')
      ON CONFLICT DO NOTHING
    `;

        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}