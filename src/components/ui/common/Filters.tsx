import { Select } from './Select';

interface FilterOption {
  value: string;
  label: string;
}

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  statusOptions: FilterOption[];
  speciesFilter: string;
  onSpeciesChange: (value: string) => void;
  speciesOptions: FilterOption[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const Filters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  statusOptions,
  speciesFilter,
  onSpeciesChange,
  speciesOptions,
  onClearFilters,
  hasActiveFilters,
}: FiltersProps) => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
      <div className="grid grid-cols-3 gap-2">
        <Select
          value={statusFilter}
          onChange={onStatusChange}
          options={statusOptions}
          placeholder="All Status"
        />
        <Select
          value={speciesFilter}
          onChange={onSpeciesChange}
          options={speciesOptions}
          placeholder="All Species"
        />
        <button
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-primary-500 hover:text-primary-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-600 disabled:hover:text-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
