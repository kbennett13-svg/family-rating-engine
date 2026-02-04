'use client';

import { useState, useTransition } from 'react';
import { addVoter, updateVoter, deleteVoter } from '@/app/actions';
import { useRouter } from 'next/navigation';

type Voter = {
  id: string;
  name: string;
  isAdmin: boolean;
};

export function VoterManagement({ voters }: { voters: Voter[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    startTransition(async () => {
      await addVoter(newName.trim());
      setNewName('');
      router.refresh();
    });
  };

  const handleEdit = async (id: string) => {
    if (!editName.trim()) return;

    startTransition(async () => {
      await updateVoter(id, { name: editName.trim() });
      setEditingId(null);
      router.refresh();
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the family? Their votes will be preserved.`)) return;

    startTransition(async () => {
      await deleteVoter(id);
      router.refresh();
    });
  };

  const handleToggleAdmin = async (id: string, currentIsAdmin: boolean) => {
    startTransition(async () => {
      await updateVoter(id, { isAdmin: !currentIsAdmin });
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      {/* Voter List */}
      <div className="space-y-2">
        {voters.map((voter) => (
          <div
            key={voter.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
          >
            {editingId === voter.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit(voter.id);
                }}
                className="flex flex-1 items-center gap-2"
              >
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{voter.name}</span>
                  {voter.isAdmin && (
                    <span className="rounded bg-purple-100 px-1.5 py-0.5 text-xs text-purple-700">
                      Admin
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleAdmin(voter.id, voter.isAdmin)}
                    disabled={isPending}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    {voter.isAdmin ? 'Remove Admin' : 'Make Admin'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(voter.id);
                      setEditName(voter.name);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(voter.id, voter.name)}
                    disabled={isPending}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add New Voter */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Add family member..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isPending || !newName.trim()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50"
        >
          Add
        </button>
      </form>
    </div>
  );
}
