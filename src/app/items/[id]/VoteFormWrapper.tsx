'use client';

import { useVoter } from '@/lib/voter-context';
import { VoteForm } from '@/components/VoteForm';

type Vote = {
  id: string;
  score: number;
  notes: string | null;
  voterId: string;
  voterName: string;
};

type Props = {
  itemId: string;
  votes: Vote[];
};

export function VoteFormWrapper({ itemId, votes }: Props) {
  const { currentVoter, isLoading } = useVoter();

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4">
        <div className="h-20 rounded bg-gray-200" />
      </div>
    );
  }

  const userVote = currentVoter
    ? votes.find((v) => v.voterId === currentVoter.id)
    : null;

  return (
    <VoteForm
      itemId={itemId}
      existingScore={userVote?.score}
      existingNotes={userVote?.notes}
    />
  );
}
