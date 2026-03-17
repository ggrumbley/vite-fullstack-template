import 'dotenv/config';

import { db } from './db.ts';
import { posts } from './schema/posts.ts';
import { users } from './schema/users.ts';

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Cleanup: Delete existing data (Postgres handles cascades if set up,
    // but manual deletion ensures a clean slate for local testing).
    await db.delete(posts);
    await db.delete(users);

    // 2. Insert Users
    const newUsers = await db
      .insert(users)
      .values([
        { name: 'Gary S.', email: 'gary.engineer@example.com', age: 46 },
        { name: 'Elena Rodriguez', email: 'elena.r@example.com', age: 32 },
        { name: 'Marcus Chen', email: 'm.chen@example.com', age: 28 },
      ])
      .returning();

    console.log(`✅ Inserted ${newUsers.length} users.`);

    // 3. Insert Posts
    // We map posts to specific user IDs returned from the previous insert.
    await db.insert(posts).values([
      {
        title: 'Balboa Park Trail Guide',
        content:
          'A deep dive into the technical sections and best times to avoid the crowds.',
        userId: newUsers[0].id,
      },
      {
        title: 'Dialing in the Perfect Espresso Shot',
        content:
          'Why your burr grinder settings matter more than the beans themselves.',
        userId: newUsers[0].id,
      },
      {
        title: 'The Rise of Signal-Focused Automations',
        content:
          'How bot APIs and high-value data scraping are creating new monetization moats.',
        userId: newUsers[1].id,
      },
      // WILDCARD: Something outside the usual tech/outdoor interests
      {
        title: 'Beginner’s Guide to Urban Beekeeping',
        content: 'How to maintain a healthy hive on a small city balcony.',
        userId: newUsers[2].id,
      },
    ]);

    console.log('✅ Inserted posts.');
    console.log('🚀 Seeding finished successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }

  process.exit(0);
}

main();
