import Link from 'next/link';
import { getVoters } from '@/app/actions';
import { VoterManagement } from './VoterManagement';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const voters = await getVoters();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <Link href="/" className="text-gray-400 hover:text-gray-600">
            ←
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Admin Settings</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* Voter Management */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Family Members</h2>
          <VoterManagement voters={voters} />
        </section>

        {/* Future Sections */}
        <section className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">
            More admin features coming in v1: Group management, data imports, etc.
          </p>
        </section>
      </main>
    </div>
  );
}
