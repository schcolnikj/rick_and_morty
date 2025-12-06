import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  apiPage: number;
  pageInfo?: {
    next: number | null;
    prev: number | null;
    count?: number;
  };
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  apiPage,
  pageInfo,
}: UsePaginationProps) => {
  const [localPage, setLocalPage] = useState(1);

  // Calculate local pagination
  const startIndex = (localPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const localItemsPerApiPage = 20; // API returns 20 items per page
  const localPagesPerApiPage = Math.ceil(localItemsPerApiPage / itemsPerPage);

  const hasNextLocal = localPage < localPagesPerApiPage && endIndex < totalItems;
  const hasPrevLocal = localPage > 1;

  // Calculate absolute page numbers
  const currentAbsolutePage = localPage + (apiPage - 1) * localPagesPerApiPage;
  const totalPages = pageInfo?.count ? Math.ceil(pageInfo.count / itemsPerPage) : 1;

  // Navigation flags
  const canGoNext = hasNextLocal || !!pageInfo?.next;
  const canGoPrev = hasPrevLocal || !!pageInfo?.prev;

  const paginatedIndices = useMemo(() => ({ startIndex, endIndex }), [startIndex, endIndex]);

  return {
    localPage,
    setLocalPage,
    currentAbsolutePage,
    totalPages,
    canGoNext,
    canGoPrev,
    hasNextLocal,
    hasPrevLocal,
    paginatedIndices,
  };
};
