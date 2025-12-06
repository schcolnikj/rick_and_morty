import { useState } from 'react';

interface UseFiltersResult {
  searchQuery: string;
  statusFilter: string;
  speciesFilter: string;
  setSearchQuery: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setSpeciesFilter: (value: string) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
}

export const useFilters = (): UseFiltersResult => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setSpeciesFilter('');
  };

  const hasActiveFilters = !!(searchQuery || statusFilter || speciesFilter);

  return {
    searchQuery,
    statusFilter,
    speciesFilter,
    setSearchQuery,
    setStatusFilter,
    setSpeciesFilter,
    clearAllFilters,
    hasActiveFilters,
  };
};
