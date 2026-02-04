import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { initialVoters, wdwRidesGroup, wdwRidesAttributes, wdwRides } from './seed-data';
import { eq } from 'drizzle-orm';

async function seed() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('❌ No database connection string found.');
    console.error('Set POSTGRES_URL or DATABASE_URL environment variable.');
    process.exit(1);
  }

  console.log('🌱 Starting database seed...');

  const client = postgres(connectionString, { ssl: 'require', max: 1 });
  const db = drizzle(client, { schema });

  try {
    // 1. Create voters
    console.log('\n📝 Creating voters...');
    for (const voter of initialVoters) {
      const existing = await db.select().from(schema.voters).where(eq(schema.voters.name, voter.name));
      if (existing.length === 0) {
        await db.insert(schema.voters).values(voter);
        console.log(`  ✓ Added voter: ${voter.name}${voter.isAdmin ? ' (admin)' : ''}`);
      } else {
        console.log(`  - Voter already exists: ${voter.name}`);
      }
    }

    // 2. Create WDW Rides group
    console.log('\n🎢 Creating WDW Rides group...');
    let group = await db.select().from(schema.groups).where(eq(schema.groups.slug, wdwRidesGroup.slug));
    let groupId: string;

    if (group.length === 0) {
      const [newGroup] = await db.insert(schema.groups).values(wdwRidesGroup).returning();
      groupId = newGroup.id;
      console.log(`  ✓ Created group: ${wdwRidesGroup.name}`);
    } else {
      groupId = group[0].id;
      console.log(`  - Group already exists: ${wdwRidesGroup.name}`);
    }

    // 3. Create group attributes
    console.log('\n📋 Creating group attributes...');
    for (const attr of wdwRidesAttributes) {
      const existing = await db.select().from(schema.groupAttributes)
        .where(eq(schema.groupAttributes.groupId, groupId));
      const attrExists = existing.some(e => e.name === attr.name);

      if (!attrExists) {
        await db.insert(schema.groupAttributes).values({
          groupId,
          name: attr.name,
          attributeType: attr.attributeType,
          options: attr.options || null,
          sortOrder: attr.sortOrder,
        });
        console.log(`  ✓ Added attribute: ${attr.name}`);
      }
    }

    // 4. Create items (rides)
    console.log('\n🎠 Creating rides...');
    let addedCount = 0;
    let skippedCount = 0;

    for (const ride of wdwRides) {
      const existing = await db.select().from(schema.items)
        .where(eq(schema.items.groupId, groupId));
      const rideExists = existing.some(e => e.name === ride.name);

      if (!rideExists) {
        await db.insert(schema.items).values({
          groupId,
          name: ride.name,
          attributes: ride.attributes,
        });
        addedCount++;
      } else {
        skippedCount++;
      }
    }
    console.log(`  ✓ Added ${addedCount} rides`);
    if (skippedCount > 0) {
      console.log(`  - Skipped ${skippedCount} existing rides`);
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\nSummary:');
    console.log(`  - Voters: ${initialVoters.length}`);
    console.log(`  - Groups: 1`);
    console.log(`  - Rides: ${wdwRides.length}`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
