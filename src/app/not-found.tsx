'use client';

import { ErrorScreen } from '@/components/ui/error/ErrorScreen';

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ErrorScreen
        title="404 - Page Not Found"
        message="Looks like you've wandered into the wrong dimension!"
        onRetry={() => (window.location.href = '/')}
        retryLabel="Go Home"
      />
    </div>
  );
}
