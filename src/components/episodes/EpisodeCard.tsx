import { Episode } from '@/types';

interface EpisodeCardProps {
  episode: Episode;
}

export const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-3 transition-all duration-200 hover:border-gray-600 hover:bg-gray-800/80">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-medium text-white">{episode.name}</h4>
          <p className="mt-1 text-xs text-gray-400">{episode.episode}</p>
        </div>
        <span className="flex-shrink-0 text-xs text-gray-500">{episode.air_date}</span>
      </div>
    </div>
  );
};
