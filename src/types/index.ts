/**
 * Core domain types for Rick and Morty API
 */

export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Location;
  location: Location;
  image: string;
  episode: Episode[];
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export interface Location {
  id: string;
  name: string;
}

/**
 * GraphQL API Response types
 */

export interface CharactersResponse {
  characters: {
    info: PageInfo;
    results: Character[];
  };
}

export interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface EpisodesResponse {
  episodes: {
    results: Episode[];
  };
}

export interface CharacterResponse {
  character: Character;
}

/**
 * Application state types
 */

export interface CharacterSelection {
  characterA: string | null;
  characterB: string | null;
}

export interface EpisodeAnalysis {
  uniqueToA: Episode[];
  uniqueToB: Episode[];
  shared: Episode[];
}

/**
 * Component prop types
 */

export interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export interface CharacterListProps {
  listType: 'A' | 'B';
  selectedId: string | null;
  onSelectCharacter: (id: string) => void;
}

export interface EpisodeListProps {
  title: string;
  episodes: Episode[];
  emptyMessage: string;
  variant: 'primary' | 'secondary' | 'shared';
  isLoading?: boolean;
}

export interface ResultsAreaProps {
  analysis: EpisodeAnalysis | null;
  isLoading: boolean;
}
