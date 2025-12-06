interface EpisodeListSkeletonProps {
  count?: number;
}

export const EpisodeListSkeleton = ({ count = 5 }: EpisodeListSkeletonProps) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-lg border border-gray-700 bg-gray-800/50 p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-700" />
              <div className="h-3 w-1/2 rounded bg-gray-700" />
            </div>
            <div className="h-3 w-16 rounded bg-gray-700" />
          </div>
        </div>
      ))}
    </>
  );
};
