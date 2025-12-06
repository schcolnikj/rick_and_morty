'use client';

import { EpisodeList } from './EpisodeList';
import { ResultsAreaProps } from '@/types';

export const ResultsArea = ({ analysis, isLoading }: ResultsAreaProps) => {
  return (
    <div className="flex h-full min-h-0 gap-4">
      <div className="group/col min-w-0 flex-1 transition-all duration-300 md:hover:flex-[2]">
        <EpisodeList
          title="Character A Only"
          episodes={analysis?.uniqueToA || []}
          emptyMessage={!analysis ? 'Select both characters' : 'No unique episodes'}
          variant="primary"
          isLoading={isLoading}
        />
      </div>
      <div className="group/col min-w-0 flex-1 transition-all duration-300 md:hover:flex-[2]">
        <EpisodeList
          title="Shared Episodes"
          episodes={analysis?.shared || []}
          emptyMessage={!analysis ? 'Select both characters' : 'No shared episodes'}
          variant="shared"
          isLoading={isLoading}
        />
      </div>
      <div className="group/col min-w-0 flex-1 transition-all duration-300 md:hover:flex-[2]">
        <EpisodeList
          title="Character B Only"
          episodes={analysis?.uniqueToB || []}
          emptyMessage={!analysis ? 'Select both characters' : 'No unique episodes'}
          variant="secondary"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
