import { render, screen } from '@testing-library/react';
import { ResultsArea } from '@/components/episodes/ResultsArea';
import { EpisodeAnalysis } from '@/types';
import { describe, expect, it, vi } from 'vitest';

// Mock child components
vi.mock('@/components/episodes/EpisodeList', () => ({
  EpisodeList: ({ title, episodes, emptyMessage, isLoading }: any) => (
    <div data-testid={`episode-list-${title}`}>
      <h3>{title}</h3>
      {isLoading && <div>Loading...</div>}
      {!isLoading && episodes.length === 0 && <div>{emptyMessage}</div>}
      {!isLoading && episodes.length > 0 && (
        <div data-testid="episodes">{episodes.length} episodes</div>
      )}
    </div>
  ),
}));

describe('ResultsArea', () => {
  const mockAnalysis: EpisodeAnalysis = {
    uniqueToA: [
      { id: '1', name: 'Episode A1', air_date: '2023-01-01', episode: 'S01E01' },
      { id: '2', name: 'Episode A2', air_date: '2023-01-02', episode: 'S01E02' },
    ],
    shared: [{ id: '3', name: 'Shared Episode', air_date: '2023-01-03', episode: 'S01E03' }],
    uniqueToB: [
      { id: '4', name: 'Episode B1', air_date: '2023-01-04', episode: 'S01E04' },
      { id: '5', name: 'Episode B2', air_date: '2023-01-05', episode: 'S01E05' },
      { id: '6', name: 'Episode B3', air_date: '2023-01-06', episode: 'S01E06' },
    ],
  };

  describe('When both characters are selected', () => {
    it('should render all three episode lists', () => {
      render(<ResultsArea analysis={mockAnalysis} isLoading={false} />);

      expect(screen.getByTestId('episode-list-Character A Only')).toBeInTheDocument();
      expect(screen.getByTestId('episode-list-Shared Episodes')).toBeInTheDocument();
      expect(screen.getByTestId('episode-list-Character B Only')).toBeInTheDocument();
    });

    it('should display correct episode counts', () => {
      render(<ResultsArea analysis={mockAnalysis} isLoading={false} />);

      const episodeSections = screen.getAllByTestId('episodes');
      expect(episodeSections[0]).toHaveTextContent('2 episodes'); // Character A
      expect(episodeSections[1]).toHaveTextContent('1 episodes'); // Shared
      expect(episodeSections[2]).toHaveTextContent('3 episodes'); // Character B
    });

    it('should show empty states when no episodes in categories', () => {
      const emptyAnalysis: EpisodeAnalysis = {
        uniqueToA: [],
        shared: [],
        uniqueToB: [],
      };

      render(<ResultsArea analysis={emptyAnalysis} isLoading={false} />);

      expect(screen.getAllByText('No unique episodes')).toHaveLength(2);
      expect(screen.getByText('No shared episodes')).toBeInTheDocument();
    });
  });

  describe('Loading state', () => {
    it('should show loading state in all lists', () => {
      render(<ResultsArea analysis={mockAnalysis} isLoading={true} />);

      const loadingIndicators = screen.getAllByText('Loading...');
      expect(loadingIndicators).toHaveLength(3);
    });

    it('should pass isLoading prop to all episode lists', () => {
      render(<ResultsArea analysis={null} isLoading={true} />);

      expect(screen.getAllByText('Loading...')).toHaveLength(3);
    });
  });

  describe('When no characters are selected', () => {
    it('should show "Select both characters" message', () => {
      render(<ResultsArea analysis={null} isLoading={false} />);

      const messages = screen.getAllByText('Select both characters');
      expect(messages).toHaveLength(3); // One for each list
    });

    it('should still render all three sections', () => {
      render(<ResultsArea analysis={null} isLoading={false} />);

      expect(screen.getByText('Character A Only')).toBeInTheDocument();
      expect(screen.getByText('Shared Episodes')).toBeInTheDocument();
      expect(screen.getByText('Character B Only')).toBeInTheDocument();
    });
  });

  describe('Mixed scenarios', () => {
    it('should handle analysis with only shared episodes', () => {
      const sharedOnlyAnalysis: EpisodeAnalysis = {
        uniqueToA: [],
        shared: [
          { id: '1', name: 'Shared 1', air_date: '2023-01-01', episode: 'S01E01' },
          { id: '2', name: 'Shared 2', air_date: '2023-01-02', episode: 'S01E02' },
        ],
        uniqueToB: [],
      };

      render(<ResultsArea analysis={sharedOnlyAnalysis} isLoading={false} />);

      expect(screen.getAllByText('No unique episodes')).toHaveLength(2);
      expect(screen.getByText('2 episodes')).toBeInTheDocument();
    });

    it('should handle analysis with no shared episodes', () => {
      const noSharedAnalysis: EpisodeAnalysis = {
        uniqueToA: [{ id: '1', name: 'Episode A', air_date: '2023-01-01', episode: 'S01E01' }],
        shared: [],
        uniqueToB: [{ id: '2', name: 'Episode B', air_date: '2023-01-02', episode: 'S01E02' }],
      };

      render(<ResultsArea analysis={noSharedAnalysis} isLoading={false} />);

      expect(screen.getByText('No shared episodes')).toBeInTheDocument();
      expect(screen.getAllByText('1 episodes')).toHaveLength(2);
    });
  });

  describe('Integration behavior', () => {
    it('should maintain three-column layout', () => {
      const { container } = render(<ResultsArea analysis={mockAnalysis} isLoading={false} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex');
    });
  });
});
