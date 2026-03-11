import { sql } from '@vercel/postgres';

export async function createPredictionsTable() {
  try {
    // Create predictions table
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

    console.log('Predictions table created successfully');
    return { success: true };
  } catch (error) {
    console.error('Error creating predictions table:', error);
    return { success: false, error };
  }
}
