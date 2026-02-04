import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getItem, getItemVotes, getVoters, getGroupBySlug } from '@/app/actions';
import { VoterPicker } from '@/components/VoterPicker';
import { VoteFormWrapper } from './VoteFormWrapper';
import { db, groups } from '@/db';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

const parkColors: Record<string, string> = {
  'Magic Kingdom': 'bg-blue-100 text-blue-800',
  'EPCOT': 'bg-purple-100 text-purple-800',
  'Hollywood Studios': 'bg-red-100 text-red-800',
  'Animal Kingdom': 'bg-green-100 text-green-800',
};

export default async function ItemPage({ params }: Props) {
  const { id } = await params;

  const [item, itemVotes, voters] = await Promise.all([
    getItem(id),
    getItemVotes(id),
    getVoters(),
  ]);

  if (!item) {
    notFound();
  }

  // Get the group for the back link
  const [group] = await db.select().from(groups).where(eq(groups.id, item.groupId));

  const attributes = item.attributes as Record<string, string>;
  const scores = itemVotes.map((v) => v.score);
  const stats = {
    avg: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null,
    count: scores.length,
    min: scores.length > 0 ? Math.min(...scores) : null,
    max: scores.length > 0 ? Math.max(...scores) : null,
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href={group ? `/groups/${group.slug}` : '/'}
                className="text-gray-400 hover:text-gray-600"
              >
                ←
              </Link>
              <span className="text-sm text-gray-500">{group?.name || 'Back'}</span>
            </div>
            <VoterPicker voters={voters} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* Item Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {attributes.park && (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  parkColors[attributes.park] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {attributes.park}
              </span>
            )}
            {attributes.land && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {attributes.land}
              </span>
            )}
            {attributes.type && (
              <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-sm text-yellow-700">
                {attributes.type}
              </span>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {stats.avg !== null ? Math.round(stats.avg) : '—'}
              </div>
              <div className="text-xs text-gray-500">Average</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-700">{stats.count}</div>
              <div className="text-xs text-gray-500">Votes</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-700">
                {stats.min !== null ? stats.min : '—'}
              </div>
              <div className="text-xs text-gray-500">Min</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-700">
                {stats.max !== null ? stats.max : '—'}
              </div>
              <div className="text-xs text-gray-500">Max</div>
            </div>
          </div>
        </div>

        {/* Vote Form */}
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Your Vote
          </h2>
          <VoteFormWrapper itemId={item.id} votes={itemVotes} />
        </div>

        {/* All Votes */}
        {itemVotes.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              All Votes
            </h2>
            <div className="space-y-2">
              {itemVotes.map((vote) => (
                <div
                  key={vote.id}
                  className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-3"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{vote.voterName}</div>
                    {vote.notes && (
                      <p className="mt-1 text-sm text-gray-500">{vote.notes}</p>
                    )}
                  </div>
                  <div className="ml-4 text-2xl font-bold text-gray-900">{vote.score}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
