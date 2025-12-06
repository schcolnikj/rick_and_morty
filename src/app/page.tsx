'use client';

import { useState } from 'react';
import { CharacterList } from '@/components/characters/CharacterList';
import { ResultsArea } from '@/components/episodes/ResultsArea';
import { useCharacterStore } from '@/store/characterStore';
import { useEpisodeAnalysis } from '@/hooks/useEpisodeAnalysis';
import { ErrorScreen } from '@/components/ui/error/ErrorScreen';
import { ErrorBoundary } from '@/components/ui/error/ErrorBoundary';
import { SplashScreen } from '@/components/ui/SplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const { characterA, characterB, setCharacterA, setCharacterB } = useCharacterStore();

  const { analysis, isLoading, isError, error } = useEpisodeAnalysis(characterA, characterB);

  const handleSelectA = (id: string) => {
    setCharacterA(characterA === id ? null : id);
  };

  const handleSelectB = (id: string) => {
    setCharacterB(characterB === id ? null : id);
  };

  // Show splash screen on first load
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Show error screen if episode analysis fails
  if (isError && characterA && characterB) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-dark">
        <ErrorScreen
          errorCode="Ooops!"
          title="Portal Gun Malfunction!"
          message={
            error?.message || "Couldn't fetch episode data from the Citadel. Try again later."
          }
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <main className="flex h-screen flex-col overflow-hidden bg-background-dark">
        <div className="flex min-h-0 flex-1 flex-col gap-4 p-6">
          <section className="shrink-0">
            <div className="flex w-full gap-2">
              <CharacterList
                listType="A"
                selectedId={characterA}
                onSelectCharacter={handleSelectA}
              />
              <CharacterList
                listType="B"
                selectedId={characterB}
                onSelectCharacter={handleSelectB}
              />
            </div>
          </section>

          <section className="min-h-0 flex-1">
            <ResultsArea analysis={analysis} isLoading={isLoading} />
          </section>
        </div>
      </main>
    </ErrorBoundary>
  );
}
