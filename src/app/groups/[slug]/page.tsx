import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGroupBySlug, getGroupItems, getVoters, getUniqueParks } from '@/app/actions';
import { VoterPicker } from '@/components/VoterPicker';
import { ItemCard } from '@/components/ItemCard';
import { GroupFilters } from './GroupFilters';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ park?: string; search?: string }>;
};

export default async function GroupPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const filters = await searchParams;

  const [group, voters, parks] = await Promise.all([
    getGroupBySlug(slug),
    getVoters(),
    getGroupBySlug(slug).then(g => g ? getUniqueParks(g.id) : []),
  ]);

  if (!group) {
    notFound();
  }

  // We'll get items client-side based on current voter
  // For SSR, we'll get without voter context
  const { votedItems, unvotedItems } = await getGroupItems(group.id, null, filters);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-gray-400 hover:text-gray-600">
                ←
              </Link>
              <h1 className="text-lg font-bold text-gray-900">{group.name}</h1>
            </div>
            <VoterPicker voters={voters} />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-2xl">
          <GroupFilters parks={parks} currentPark={filters.park} currentSearch={filters.search} />
        </div>
      </div>

      {/* Items List */}
      <main className="mx-auto max-w-2xl px-4 py-4">
        {/* Voted Items */}
        {votedItems.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Rankings ({votedItems.length})
            </h2>
            <div className="space-y-2">
              {votedItems.map((item, index) => (
                <ItemCard key={item.id} item={item} rank={index + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Unvoted Items */}
        {unvotedItems.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Not Yet Rated ({unvotedItems.length})
            </h2>
            <div className="space-y-2">
              {unvotedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {votedItems.length === 0 && unvotedItems.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <p className="text-gray-500">No items found.</p>
            {(filters.park || filters.search) && (
              <Link href={`/groups/${slug}`} className="mt-2 text-sm text-blue-600 hover:underline">
                Clear filters
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
