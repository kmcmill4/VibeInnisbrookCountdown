import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const PLAYER_NICKNAMES = [
  'KMac', 'BK', 'Benny', 'Gootz', 'Peppy', 
  'Caker', 'Rosey', 'Bluey', 'Frenchie', 'RayRay'
];

export async function GET() {
  try {
    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS predictions (
        id SERIAL PRIMARY KEY,
        player VARCHAR(50) NOT NULL UNIQUE,
        hole16 INTEGER NOT NULL,
        hole17 INTEGER NOT NULL,
        hole18 INTEGER NOT NULL,
        total INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Fetch all predictions
    const result = await sql`
      SELECT player, hole16, hole17, hole18, total
      FROM predictions
      ORDER BY total ASC;
    `;

    // Create a map of existing predictions
    const existingPredictions = new Map(
      result.rows.map(row => [row.player, row])
    );

    // Build response with all players (submitted or not)
    const predictions = PLAYER_NICKNAMES.map(nickname => {
      const existing = existingPredictions.get(nickname);
      if (existing) {
        return {
          player: existing.player,
          hole16: existing.hole16,
          hole17: existing.hole17,
          hole18: existing.hole18,
          total: existing.total,
          submitted: true,
        };
      } else {
        return {
          player: nickname,
          hole16: 0,
          hole17: 0,
          hole18: 0,
          total: 0,
          submitted: false,
        };
      }
    });

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch predictions' },
      { status: 500 }
    );
  }
}
