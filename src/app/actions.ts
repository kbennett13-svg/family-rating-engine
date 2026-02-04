'use server';

import { db, voters, groups, items, votes, groupAttributes } from '@/db';
import { eq, and, isNull, desc, asc, sql, ilike } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// ============ VOTER ACTIONS ============

export async function getVoters() {
  return await db
    .select()
    .from(voters)
    .where(isNull(voters.deletedAt))
    .orderBy(asc(voters.name));
}

export async function addVoter(name: string, isAdmin: boolean = false) {
  const [voter] = await db
    .insert(voters)
    .values({ name, isAdmin })
    .returning();
  revalidatePath('/');
  revalidatePath('/admin');
  return voter;
}

export async function updateVoter(id: string, data: { name?: string; isAdmin?: boolean }) {
  const [voter] = await db
    .update(voters)
    .set(data)
    .where(eq(voters.id, id))
    .returning();
  revalidatePath('/');
  revalidatePath('/admin');
  return voter;
}

export async function deleteVoter(id: string) {
  await db
    .update(voters)
    .set({ deletedAt: new Date() })
    .where(eq(voters.id, id));
  revalidatePath('/');
  revalidatePath('/admin');
}

// ============ GROUP ACTIONS ============

export async function getGroups() {
  return await db
    .select()
    .from(groups)
    .where(isNull(groups.deletedAt))
    .orderBy(asc(groups.name));
}

export async function getGroupBySlug(slug: string) {
  const [group] = await db
    .select()
    .from(groups)
    .where(and(eq(groups.slug, slug), isNull(groups.deletedAt)));
  return group;
}

export async function getGroupAttributes(groupId: string) {
  return await db
    .select()
    .from(groupAttributes)
    .where(eq(groupAttributes.groupId, groupId))
    .orderBy(asc(groupAttributes.sortOrder));
}

// ============ ITEM ACTIONS ============

export type ItemWithStats = {
  id: string;
  name: string;
  attributes: Record<string, string | number>;
  avgScore: number | null;
  voteCount: number;
  minScore: number | null;
  maxScore: number | null;
  userVote: { score: number; notes: string | null } | null;
};

export async function getGroupItems(
  groupId: string,
  voterId: string | null,
  filters?: { park?: string; search?: string }
): Promise<{ votedItems: ItemWithStats[]; unvotedItems: ItemWithStats[] }> {
  // Build where conditions
  let whereConditions = and(
    eq(items.groupId, groupId),
    isNull(items.deletedAt)
  );

  // Get all items for the group
  const allItems = await db
    .select({
      id: items.id,
      name: items.name,
      attributes: items.attributes,
    })
    .from(items)
    .where(whereConditions)
    .orderBy(asc(items.name));

  // Get all votes for these items
  const itemIds = allItems.map(i => i.id);

  const allVotes = itemIds.length > 0
    ? await db
        .select({
          itemId: votes.itemId,
          voterId: votes.voterId,
          score: votes.score,
          notes: votes.notes,
        })
        .from(votes)
        .where(sql`${votes.itemId} = ANY(${itemIds})`)
    : [];

  // Process items with stats
  const itemsWithStats: ItemWithStats[] = allItems.map(item => {
    const itemVotes = allVotes.filter(v => v.itemId === item.id);
    const scores = itemVotes.map(v => v.score);
    const userVoteData = voterId ? itemVotes.find(v => v.voterId === voterId) : null;

    return {
      id: item.id,
      name: item.name,
      attributes: item.attributes || {},
      avgScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null,
      voteCount: scores.length,
      minScore: scores.length > 0 ? Math.min(...scores) : null,
      maxScore: scores.length > 0 ? Math.max(...scores) : null,
      userVote: userVoteData ? { score: userVoteData.score, notes: userVoteData.notes } : null,
    };
  });

  // Apply filters
  let filtered = itemsWithStats;

  if (filters?.park) {
    filtered = filtered.filter(item =>
      (item.attributes as Record<string, string>).park === filters.park
    );
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchLower)
    );
  }

  // Split into voted and unvoted
  const votedItems = filtered
    .filter(item => item.voteCount > 0)
    .sort((a, b) => (b.avgScore || 0) - (a.avgScore || 0));

  const unvotedItems = filtered
    .filter(item => item.voteCount === 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return { votedItems, unvotedItems };
}

export async function getItem(itemId: string) {
  const [item] = await db
    .select()
    .from(items)
    .where(eq(items.id, itemId));
  return item;
}

export async function getItemVotes(itemId: string) {
  return await db
    .select({
      id: votes.id,
      score: votes.score,
      notes: votes.notes,
      voterId: votes.voterId,
      voterName: voters.name,
      updatedAt: votes.updatedAt,
    })
    .from(votes)
    .innerJoin(voters, eq(votes.voterId, voters.id))
    .where(eq(votes.itemId, itemId))
    .orderBy(desc(votes.score));
}

// ============ VOTE ACTIONS ============

export async function submitVote(
  itemId: string,
  voterId: string,
  score: number,
  notes?: string
) {
  // Check if vote exists
  const existing = await db
    .select()
    .from(votes)
    .where(and(eq(votes.itemId, itemId), eq(votes.voterId, voterId)));

  if (existing.length > 0) {
    // Update existing vote
    const [vote] = await db
      .update(votes)
      .set({ score, notes, updatedAt: new Date() })
      .where(and(eq(votes.itemId, itemId), eq(votes.voterId, voterId)))
      .returning();
    revalidatePath('/');
    return vote;
  } else {
    // Create new vote
    const [vote] = await db
      .insert(votes)
      .values({ itemId, voterId, score, notes })
      .returning();
    revalidatePath('/');
    return vote;
  }
}

// ============ UTILITY FUNCTIONS ============

export async function getUniqueParks(groupId: string) {
  const allItems = await db
    .select({ attributes: items.attributes })
    .from(items)
    .where(and(eq(items.groupId, groupId), isNull(items.deletedAt)));

  const parks = new Set<string>();
  allItems.forEach(item => {
    const park = (item.attributes as Record<string, string>)?.park;
    if (park) parks.add(park);
  });

  return Array.from(parks).sort();
}
