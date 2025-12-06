interface CharacterCardSkeletonProps {
  count?: number;
}

export const CharacterCardSkeleton = ({ count = 1 }: CharacterCardSkeletonProps) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-lg border-2 border-gray-700 bg-gray-800/50 p-3"
        >
          <div className="flex gap-3">
            {/* Image skeleton */}
            <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-700" />

            {/* Content skeleton */}
            <div className="flex min-w-0 flex-1 flex-col justify-center space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-700" />
              <div className="h-3 w-1/2 rounded bg-gray-700" />
              <div className="h-3 w-1/3 rounded bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
