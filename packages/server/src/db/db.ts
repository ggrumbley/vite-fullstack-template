import 'dotenv/config';

import { neon } from '@neondatabase/serverless';
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-http'; // For production
import { drizzle } from 'drizzle-orm/node-postgres'; // For local
import pg from 'pg';

const connectionString = process.env.DATABASE_URL!;

export const db = connectionString.includes('neon.tech')
  ? neonDrizzle(neon(connectionString))
  : drizzle(new pg.Pool({ connectionString }));
