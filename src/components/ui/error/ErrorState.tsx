import Image from 'next/image';

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Try refreshing the page',
}: ErrorStateProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 p-4">
      <div className="relative h-40 w-40">
        <Image src="/query_error.png" alt="Error" fill className="object-contain" />
      </div>
      <div className="text-center">
        <p className="mb-2 text-4xl font-bold text-primary-400">Ooops!</p>
        <p className="font-medium text-white">{title}</p>
        <p className="mt-1 text-xs text-gray-500">{message}</p>
      </div>
    </div>
  );
};
