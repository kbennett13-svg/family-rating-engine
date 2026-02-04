'use client';

import Link from 'next/link';
import type { ItemWithStats } from '@/app/actions';

const parkColors: Record<string, string> = {
  'Magic Kingdom': 'bg-blue-100 text-blue-800',
  'EPCOT': 'bg-purple-100 text-purple-800',
  'Hollywood Studios': 'bg-red-100 text-red-800',
  'Animal Kingdom': 'bg-green-100 text-green-800',
};

export function ItemCard({ item, rank }: { item: ItemWithStats; rank?: number }) {
  const park = (item.attributes as Record<string, string>)?.park;
  const land = (item.attributes as Record<string, string>)?.land;
  const type = (item.attributes as Record<string, string>)?.type;

  return (
    <Link
      href={`/items/${item.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        {/* Rank or Score */}
        <div className="flex flex-col items-center">
          {rank !== undefined && (
            <span className="text-xs font-medium text-gray-400">#{rank}</span>
          )}
          {item.avgScore !== null ? (
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(item.avgScore)}
            </span>
          ) : (
            <span className="text-lg text-gray-400">—</span>
          )}
          {item.voteCount > 0 && (
            <span className="text-xs text-gray-500">
              {item.voteCount} vote{item.voteCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Item Details */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-gray-900">{item.name}</h3>
          <div className="mt-1 flex flex-wrap gap-1">
            {park && (
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${parkColors[park] || 'bg-gray-100 text-gray-800'}`}>
                {park}
              </span>
            )}
            {land && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {land}
              </span>
            )}
            {type && (
              <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs text-yellow-700">
                {type}
              </span>
            )}
          </div>
        </div>

        {/* User's Vote Indicator */}
        {item.userVote && (
          <div className="flex flex-col items-center rounded bg-blue-50 px-2 py-1">
            <span className="text-xs text-blue-600">You</span>
            <span className="font-semibold text-blue-700">{item.userVote.score}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export function ItemCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
