'use client';

import { EpisodeListProps } from '@/types';
import { cn } from '@/lib/utils';
import { episodeVariantStyles } from '@/lib/episodeVariants';
import { EpisodeListSkeleton } from './EpisodeListSkeleton';
import { EpisodeCard } from './EpisodeCard';
import { EmptyState } from '@/components/ui/error/EmptyState';

export const EpisodeList = ({
  title,
  episodes,
  emptyMessage,
  variant,
  isLoading = false,
}: EpisodeListProps) => {
  const styles = episodeVariantStyles[variant];

  return (
    <div
      className={cn(
        'flex h-full min-h-0 flex-col rounded-lg border backdrop-blur-sm',
        styles.border,
        styles.bg
      )}
    >
      {/* Header */}
      <div className="shrink-0 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className={cn('text-base font-semibold', styles.title)}>{title}</h3>
          <span className={cn('rounded-full px-2 py-1 text-xs font-bold text-black', styles.badge)}>
            {episodes.length}
          </span>
        </div>
      </div>

      <div className="scrollbar-custom flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
        {isLoading ? (
          <EpisodeListSkeleton />
        ) : episodes.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          episodes.map((episode) => <EpisodeCard key={episode.id} episode={episode} />)
        )}
      </div>
    </div>
  );
};
