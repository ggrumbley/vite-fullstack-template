import 'dotenv/config';

import { end, getClient } from './index.ts';

async function main() {
  const client = await getClient();
  try {
    await client.query('BEGIN');

    await client.query('DELETE FROM posts');
    await client.query('DELETE FROM users');

    const { rows: newUsers } = await client.query(`
      INSERT INTO users (name, email, age) VALUES
        ('Gary S.', 'gary.engineer@example.com', 46),
        ('Elena Rodriguez', 'elena.r@example.com', 32),
        ('Marcus Chen', 'm.chen@example.com', 28)
      RETURNING id
    `);

    await client.query(
      `
      INSERT INTO posts (title, content, user_id) VALUES
        ($1, $2, $3),
        ($4, $5, $6),
        ($7, $8, $9),
        ($10, $11, $12)
    `,
      [
        'Balboa Park Trail Guide',
        'A deep dive into the technical sections and best times to avoid the crowds.',
        newUsers[0].id,
        'Dialing in the Perfect Espresso Shot',
        'Why your burr grinder settings matter more than the beans themselves.',
        newUsers[0].id,
        'The Rise of Signal-Focused Automations',
        'How bot APIs and high-value data scraping are creating new monetization moats.',
        newUsers[1].id,
        "Beginner's Guide to Urban Beekeeping",
        'How to maintain a healthy hive on a small city balcony.',
        newUsers[2].id,
      ],
    );

    await client.query('COMMIT');
    console.log('Seeding finished successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seeding failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await end();
  }
}

main();
