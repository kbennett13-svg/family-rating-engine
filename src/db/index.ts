import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// For Vercel/Neon, use the connection string from environment
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || '';

// Create postgres client
// In production, use connection pooling
const client = postgres(connectionString, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  max: 1, // Limit connections for serverless
});

// Create drizzle instance
export const db = drizzle(client, { schema });

export * from './schema';
