import { pgTable, uuid, text, integer, boolean, timestamp, jsonb, unique } from 'drizzle-orm/pg-core';

// Voters (family members)
export const voters = pgTable('voters', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  isAdmin: boolean('is_admin').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Groups (categories like "WDW Rides", "WDW Dining")
export const groups = pgTable('groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Group attributes (schema for items in a group)
export const groupAttributes = pgTable('group_attributes', {
  id: uuid('id').defaultRandom().primaryKey(),
  groupId: uuid('group_id').references(() => groups.id).notNull(),
  name: text('name').notNull(),
  attributeType: text('attribute_type').notNull(), // 'text', 'select', 'number'
  options: jsonb('options'), // for select types: ["Magic Kingdom", "EPCOT", ...]
  sortOrder: integer('sort_order').default(0).notNull(),
});

// Items (rides, restaurants, coasters)
export const items = pgTable('items', {
  id: uuid('id').defaultRandom().primaryKey(),
  groupId: uuid('group_id').references(() => groups.id).notNull(),
  name: text('name').notNull(),
  attributes: jsonb('attributes').$type<Record<string, string | number>>().default({}).notNull(),
  sourceUrl: text('source_url'),
  externalId: text('external_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  uniqueNameInGroup: unique().on(table.groupId, table.name),
}));

// Votes
export const votes = pgTable('votes', {
  id: uuid('id').defaultRandom().primaryKey(),
  itemId: uuid('item_id').references(() => items.id).notNull(),
  voterId: uuid('voter_id').references(() => voters.id).notNull(),
  score: integer('score').notNull(), // 1-100
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniqueVotePerVoter: unique().on(table.itemId, table.voterId),
}));

// Type exports
export type Voter = typeof voters.$inferSelect;
export type NewVoter = typeof voters.$inferInsert;
export type Group = typeof groups.$inferSelect;
export type NewGroup = typeof groups.$inferInsert;
export type GroupAttribute = typeof groupAttributes.$inferSelect;
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;
