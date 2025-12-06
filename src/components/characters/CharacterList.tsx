'use client';

import { useState, useMemo, useEffect } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { useFilters } from '@/hooks/useFilters';
import { CharacterCard } from './CharacterCard';
import { CharacterCardSkeleton } from './CharacterCardSkeleton';
import { CharacterListProps } from '@/types';
import { Pagination } from '@/components/ui/common/Pagination';
import { EmptyState } from '@/components/ui/error/EmptyState';
import { ErrorState } from '@/components/ui/error/ErrorState';
import { Filters } from '@/components/ui/common/Filters';

const CHARACTERS_PER_PAGE = 4;

const STATUS_OPTIONS = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];

const SPECIES_OPTIONS = [
  { value: 'Human', label: 'Human' },
  { value: 'Alien', label: 'Alien' },
  { value: 'Humanoid', label: 'Humanoid' },
  { value: 'Robot', label: 'Robot' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Cronenberg', label: 'Cronenberg' },
  { value: 'Disease', label: 'Disease' },
  { value: 'Mythological Creature', label: 'Mythological' },
];

export const CharacterList = ({ listType, selectedId, onSelectCharacter }: CharacterListProps) => {
  const [apiPage, setApiPage] = useState(1);

  const {
    searchQuery,
    statusFilter,
    speciesFilter,
    setSearchQuery,
    setStatusFilter,
    setSpeciesFilter,
    clearAllFilters,
    hasActiveFilters,
  } = useFilters();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filters = {
    name: debouncedSearchQuery || undefined,
    status: statusFilter || undefined,
    species: speciesFilter || undefined,
  };

  const { data, isLoading, isError } = useCharacters(apiPage, filters);
  const allCharacters = data?.characters.results ?? [];
  const pageInfo = data?.characters.info;

  const pagination = usePagination({
    totalItems: allCharacters.length,
    itemsPerPage: CHARACTERS_PER_PAGE,
    apiPage,
    pageInfo,
  });

  // Slice characters for current page
  const paginatedCharacters = useMemo(() => {
    const { startIndex, endIndex } = pagination.paginatedIndices;
    return allCharacters.slice(startIndex, endIndex);
  }, [allCharacters, pagination.paginatedIndices]);

  // Reset to first page when debounced search changes
  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      return;
    }
    setApiPage(1);
    pagination.setLocalPage(1);
  }, [searchQuery, pagination, debouncedSearchQuery]);

  // Reset to first page when other filters change
  const handleFilterChange = () => {
    setApiPage(1);
    pagination.setLocalPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    handleFilterChange();
  };

  const handleSpeciesChange = (value: string) => {
    setSpeciesFilter(value);
    handleFilterChange();
  };

  const handlePreviousPage = () => {
    if (pagination.hasPrevLocal) {
      pagination.setLocalPage(pagination.localPage - 1);
    } else if (pageInfo?.prev) {
      setApiPage(pageInfo.prev);
      pagination.setLocalPage(Math.ceil(20 / CHARACTERS_PER_PAGE));
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextLocal) {
      pagination.setLocalPage(pagination.localPage + 1);
    } else if (pageInfo?.next) {
      setApiPage(pageInfo.next);
      pagination.setLocalPage(1);
    }
  };

  return (
    <div className="flex w-full flex-col rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm">
      {/* Header with pagination */}
      <div className="border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-secondary-300">Character List {listType}</h2>
            <p className="text-xs text-gray-500">Select a character</p>
          </div>
          <Pagination
            currentPage={pagination.currentAbsolutePage}
            totalPages={pagination.totalPages}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            canGoPrev={pagination.canGoPrev}
            canGoNext={pagination.canGoNext}
            isLoading={isLoading}
          />
        </div>
        <div className="mt-3">
          <Filters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
            statusOptions={STATUS_OPTIONS}
            speciesFilter={speciesFilter}
            onSpeciesChange={handleSpeciesChange}
            speciesOptions={SPECIES_OPTIONS}
            onClearFilters={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>

      <div className="scrollbar-custom flex flex-1 flex-col gap-2 overflow-y-auto p-3">
        {isLoading && <CharacterCardSkeleton count={CHARACTERS_PER_PAGE} />}

        {!isLoading && isError && <ErrorState title="Failed to load characters" />}

        {!isLoading && !isError && paginatedCharacters.length === 0 && (
          <EmptyState message="No results found matching this filter" />
        )}

        {!isLoading &&
          !isError &&
          paginatedCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isSelected={selectedId === character.id}
              onSelect={onSelectCharacter}
            />
          ))}
      </div>
    </div>
  );
};
