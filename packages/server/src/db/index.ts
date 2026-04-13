import 'dotenv/config';

import pg from 'pg';

import { logger } from '../lib/logger.ts';

if (!process.env.DATABASE_URL) {
  logger.fatal('DATABASE_URL environment variable is required');
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  logger.error({ err }, 'Unexpected error on idle database client');
});

const SLOW_QUERY_MS = 500;

export const query = async <T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
) => {
  const start = Date.now();
  try {
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (duration > SLOW_QUERY_MS) {
      logger.warn({ duration, query: text }, 'Slow query detected');
    }
    return result;
  } catch (err) {
    // Log which query failed for context, then re-throw so errorMiddleware handles it.
    // Params are intentionally omitted — they may contain passwords or PII.
    logger.error({ err, query: text }, 'Database query failed');
    throw err;
  }
};

export const getClient = () => pool.connect();
export const end = () => pool.end();
