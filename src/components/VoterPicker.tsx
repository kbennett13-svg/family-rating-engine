'use client';

import { useVoter } from '@/lib/voter-context';

type Voter = {
  id: string;
  name: string;
  isAdmin: boolean;
};

export function VoterPicker({ voters }: { voters: Voter[] }) {
  const { currentVoter, setCurrentVoter, isLoading } = useVoter();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="voter-select" className="text-sm font-medium text-gray-700">
        Voting as:
      </label>
      <select
        id="voter-select"
        value={currentVoter?.id || ''}
        onChange={(e) => {
          const voter = voters.find(v => v.id === e.target.value);
          setCurrentVoter(voter || null);
        }}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select your name</option>
        {voters.map((voter) => (
          <option key={voter.id} value={voter.id}>
            {voter.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function VoterRequired({ children, voters }: { children: React.ReactNode; voters: Voter[] }) {
  const { currentVoter, isLoading } = useVoter();

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!currentVoter) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Who&apos;s voting?</h2>
          <p className="mt-1 text-sm text-gray-500">Select your name to start rating</p>
        </div>
        <VoterPicker voters={voters} />
      </div>
    );
  }

  return <>{children}</>;
}
