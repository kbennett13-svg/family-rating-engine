'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';

type Props = {
  parks: string[];
  currentPark?: string;
  currentSearch?: string;
};

export function GroupFilters({ parks, currentPark, currentSearch }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(currentSearch || '');

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== currentSearch) {
        updateFilters({ search: search || undefined });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const updateFilters = (updates: { park?: string; search?: string }) => {
    const params = new URLSearchParams();

    const newPark = 'park' in updates ? updates.park : currentPark;
    const newSearch = 'search' in updates ? updates.search : currentSearch;

    if (newPark) params.set('park', newPark);
    if (newSearch) params.set('search', newSearch);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Park Filter */}
      {parks.length > 0 && (
        <select
          value={currentPark || ''}
          onChange={(e) => updateFilters({ park: e.target.value || undefined })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Parks</option>
          {parks.map((park) => (
            <option key={park} value={park}>
              {park}
            </option>
          ))}
        </select>
      )}

      {/* Search */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {(currentPark || currentSearch) && (
        <button
          onClick={() => {
            setSearch('');
            router.push(pathname);
          }}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear
        </button>
      )}
    </div>
  );
}
