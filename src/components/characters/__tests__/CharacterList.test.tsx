import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CharacterList } from '@/components/characters/CharacterList';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the hooks
vi.mock('@/hooks/useCharacters');
vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value, // Return immediately for tests
}));

import { useCharacters } from '@/hooks/useCharacters';
import { Mock } from 'vitest';

const mockedUseCharacters = useCharacters as Mock;

describe('CharacterList Integration', () => {
  const mockOnSelectCharacter = vi.fn();
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  const renderWithQuery = (ui: React.ReactElement) => {
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
  };

  const mockCharacterData = {
    characters: {
      info: {
        count: 826,
        pages: 42,
        next: 2,
        prev: null,
      },
      results: [
        {
          id: '1',
          name: 'Rick Sanchez',
          status: 'Alive' as const,
          species: 'Human',
          type: '',
          gender: 'Male' as const,
          origin: { id: '1', name: 'Earth' },
          location: { id: '20', name: 'Earth' },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [],
        },
        {
          id: '2',
          name: 'Morty Smith',
          status: 'Alive' as const,
          species: 'Human',
          type: '',
          gender: 'Male' as const,
          origin: { id: '1', name: 'Earth' },
          location: { id: '20', name: 'Earth' },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          episode: [],
        },
      ],
    },
  };

  describe('Character Selection', () => {
    it('should render character list', () => {
      mockedUseCharacters.mockReturnValue({
        data: mockCharacterData,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      renderWithQuery(
        <CharacterList listType="A" selectedId={null} onSelectCharacter={mockOnSelectCharacter} />
      );

      expect(screen.getByText('Character List A')).toBeInTheDocument();
    });

    it('should show selected character', () => {
      mockedUseCharacters.mockReturnValue({
        data: mockCharacterData,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      renderWithQuery(
        <CharacterList listType="A" selectedId="1" onSelectCharacter={mockOnSelectCharacter} />
      );

      // Check if selected badge is shown
      expect(screen.getByText('✓ Selected')).toBeInTheDocument();
    });

    it('should display loading skeletons when loading', () => {
      mockedUseCharacters.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
      } as any);

      const { container } = renderWithQuery(
        <CharacterList listType="A" selectedId={null} onSelectCharacter={mockOnSelectCharacter} />
      );

      // Check for skeleton loaders (4 character cards + 1 pagination)
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeCloseTo(5);
    });

    it('should display error message when query fails', () => {
      mockedUseCharacters.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error('API Error'),
      } as any);

      renderWithQuery(
        <CharacterList listType="A" selectedId={null} onSelectCharacter={mockOnSelectCharacter} />
      );

      expect(screen.getByText('Failed to load characters')).toBeInTheDocument();
    });

    it('should show no results message when filter returns empty', () => {
      mockedUseCharacters.mockReturnValue({
        data: {
          characters: {
            info: mockCharacterData.characters.info,
            results: [],
          },
        },
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      renderWithQuery(
        <CharacterList listType="A" selectedId={null} onSelectCharacter={mockOnSelectCharacter} />
      );

      expect(screen.getByText('No results found matching this filter')).toBeInTheDocument();
    });
  });

  describe('Pagination Logic', () => {
    it('should calculate correct page numbers', () => {
      mockedUseCharacters.mockReturnValue({
        data: mockCharacterData,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      renderWithQuery(
        <CharacterList listType="A" selectedId={null} onSelectCharacter={mockOnSelectCharacter} />
      );

      // Should show page 1 out of some total pages (format: "1/X")
      const paginationText = screen.getByText((content, element) => {
        return /^1\/\d+$/.test(element?.textContent || '');
      });
      expect(paginationText).toBeInTheDocument();

      // Verify pagination controls exist
      const prevButton = screen.getByRole('button', { name: '<' });
      const nextButton = screen.getByRole('button', { name: '>' });
      expect(prevButton).toBeDisabled(); // First page, prev should be disabled
      expect(nextButton).toBeEnabled(); // Should have more pages
    });

    it('should show 1/1 when no results', () => {
      mockedUseCharacters.mockReturnValue({
        data: {
          characters: {
            info: { count: 0, pages: 0, next: null, prev: null },
            results: [],
          },
        },
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      renderWithQuery(
        <CharacterList listType="A" selectedId={null} onSelectCharacter={mockOnSelectCharacter} />
      );

      const paginationText = screen.getByText((content, element) => {
        return element?.textContent === '1/1';
      });
      expect(paginationText).toBeInTheDocument();
    });
  });

  describe('Filter Functionality', () => {
    it('should render status filter', () => {
      mockedUseCharacters.mockReturnValue({
        data: mockCharacterData,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      renderWithQuery(
        <CharacterList listType="A" selectedId={null} onSelectCharacter={mockOnSelectCharacter} />
      );

      const statusFilter = screen.getByDisplayValue('All Status');
      expect(statusFilter).toBeInTheDocument();
    });

    it('should render species filter', () => {
      mockedUseCharacters.mockReturnValue({
        data: mockCharacterData,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      renderWithQuery(
        <CharacterList listType="A" selectedId={null} onSelectCharacter={mockOnSelectCharacter} />
      );

      const speciesFilter = screen.getByDisplayValue('All Species');
      expect(speciesFilter).toBeInTheDocument();
    });

    it('should render search input', () => {
      mockedUseCharacters.mockReturnValue({
        data: mockCharacterData,
        isLoading: false,
        isError: false,
        error: null,
      } as any);

      renderWithQuery(
        <CharacterList listType="A" selectedId={null} onSelectCharacter={mockOnSelectCharacter} />
      );

      const searchInput = screen.getByPlaceholderText('Search by name...');
      expect(searchInput).toBeInTheDocument();
    });
  });
});
