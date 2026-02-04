import Link from 'next/link';
import { getGroups, getVoters } from './actions';
import { VoterPicker } from '@/components/VoterPicker';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [groups, voters] = await Promise.all([
    getGroups(),
    getVoters(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Family Ratings</h1>
          <VoterPicker voters={voters} />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Rating Groups</h2>

        {groups.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <p className="text-gray-500">No groups yet.</p>
            <p className="mt-2 text-sm text-gray-400">
              Run the seed script to add WDW Rides data.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((group) => (
              <Link
                key={group.id}
                href={`/groups/${group.slug}`}
                className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                {group.description && (
                  <p className="mt-1 text-sm text-gray-500">{group.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Admin Link */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <Link
            href="/admin"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Admin Settings →
          </Link>
        </div>
      </main>
    </div>
  );
}
