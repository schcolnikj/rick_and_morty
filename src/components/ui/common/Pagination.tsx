interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  canGoPrev,
  canGoNext,
  isLoading = false,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPrevious}
        disabled={!canGoPrev || isLoading}
        className="rounded border border-gray-600 bg-gray-800 px-3 py-1 text-sm font-medium text-white transition-colors hover:border-primary-500 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-600 disabled:hover:bg-gray-800"
      >
        &lt;
      </button>
      {isLoading ? (
        <div className="h-5 w-16 animate-pulse rounded bg-gray-700" />
      ) : (
        <span className="text-sm text-gray-400">
          {currentPage}/{totalPages}
        </span>
      )}
      <button
        onClick={onNext}
        disabled={!canGoNext || isLoading}
        className="rounded border border-gray-600 bg-gray-800 px-3 py-1 text-sm font-medium text-white transition-colors hover:border-primary-500 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-600 disabled:hover:bg-gray-800"
      >
        &gt;
      </button>
    </div>
  );
};
