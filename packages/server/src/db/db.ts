import { drizzle } from 'drizzle-orm/node-postgres'; // For local
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-http'; // For production
import { neon } from '@neondatabase/serverless';
import pg from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL!;

export const db = connectionString.includes('neon.tech')
  ? neonDrizzle(neon(connectionString))
  : drizzle(new pg.Pool({ connectionString }));
