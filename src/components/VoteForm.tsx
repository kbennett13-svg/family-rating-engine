'use client';

import { useState, useTransition } from 'react';
import { useVoter } from '@/lib/voter-context';
import { submitVote } from '@/app/actions';
import { useRouter } from 'next/navigation';

type VoteFormProps = {
  itemId: string;
  existingScore?: number;
  existingNotes?: string | null;
};

export function VoteForm({ itemId, existingScore, existingNotes }: VoteFormProps) {
  const { currentVoter } = useVoter();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [score, setScore] = useState(existingScore || 50);
  const [notes, setNotes] = useState(existingNotes || '');
  const [saved, setSaved] = useState(false);

  if (!currentVoter) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
        <p className="text-gray-500">Select your name above to vote</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await submitVote(itemId, currentVoter.id, score, notes || undefined);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">
            Your Score
          </label>
          <span className="text-3xl font-bold text-gray-900">{score}</span>
        </div>
        <input
          type="range"
          id="score"
          min="1"
          max="100"
          value={score}
          onChange={(e) => setScore(parseInt(e.target.value))}
          className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>1 (Worst)</span>
          <span>50</span>
          <span>100 (Best)</span>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="What did you think?"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending ? 'Saving...' : existingScore ? 'Update Vote' : 'Submit Vote'}
      </button>

      {saved && (
        <div className="rounded-md bg-green-50 p-2 text-center text-sm text-green-700">
          Vote saved!
        </div>
      )}
    </form>
  );
}
