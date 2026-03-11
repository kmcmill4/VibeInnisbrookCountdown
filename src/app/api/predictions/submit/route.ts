import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { player, hole16, hole17, hole18, total } = body;

    // Validate input
    if (!player || !hole16 || !hole17 || !hole18) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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

    // Insert or update prediction
    await sql`
      INSERT INTO predictions (player, hole16, hole17, hole18, total, updated_at)
      VALUES (${player}, ${hole16}, ${hole17}, ${hole18}, ${total}, CURRENT_TIMESTAMP)
      ON CONFLICT (player)
      DO UPDATE SET
        hole16 = ${hole16},
        hole17 = ${hole17},
        hole18 = ${hole18},
        total = ${total},
        updated_at = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting prediction:', error);
    return NextResponse.json(
      { error: 'Failed to submit prediction' },
      { status: 500 }
    );
  }
}