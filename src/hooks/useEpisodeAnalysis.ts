import { useQuery, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { GET_CHARACTER_BY_ID } from '@/lib/queries';
import {
  CharacterResponse,
  CharactersResponse,
  EpisodeAnalysis,
  Episode,
  Character,
} from '@/types';

const analyzeEpisodes = (episodesA: Episode[], episodesB: Episode[]): EpisodeAnalysis => {
  const idsA = new Set(episodesA.map((ep) => ep.id));
  const idsB = new Set(episodesB.map((ep) => ep.id));

  const uniqueToA = episodesA.filter((ep) => !idsB.has(ep.id));
  const uniqueToB = episodesB.filter((ep) => !idsA.has(ep.id));
  const shared = episodesA.filter((ep) => idsB.has(ep.id));

  return {
    uniqueToA,
    uniqueToB,
    shared,
  };
};

/**
 * Search for character data in cached useCharacters queries
 */
const findCharacterInCache = (
  queryClient: ReturnType<typeof useQueryClient>,
  characterId: string
): Character | null => {
  // Get all cached queries that match the 'characters' key pattern
  const cachedQueries = queryClient.getQueriesData<CharactersResponse>({
    queryKey: ['characters'],
  });

  // Search through all cached character lists
  for (const [, data] of cachedQueries) {
    if (data?.characters?.results) {
      const character = data.characters.results.find((char) => char.id === characterId);
      if (character) {
        return character;
      }
    }
  }

  return null;
};

export const useEpisodeAnalysis = (characterAId: string | null, characterBId: string | null) => {
  const queryClient = useQueryClient();
  const enabled = Boolean(characterAId && characterBId);

  const queryA = useQuery<CharacterResponse>({
    queryKey: ['character', characterAId],
    queryFn: async () => {
      if (!characterAId) throw new Error('Character A ID is required');

      // Check cache first
      const cachedCharacter = findCharacterInCache(queryClient, characterAId);
      if (cachedCharacter) {
        return { character: cachedCharacter };
      }

      // Fetch if not in cache
      const data = await graphqlClient.request<CharacterResponse>(GET_CHARACTER_BY_ID, {
        id: characterAId,
      });
      return data;
    },
    enabled: enabled && Boolean(characterAId),
    staleTime: 5 * 60 * 1000,
  });

  const queryB = useQuery<CharacterResponse>({
    queryKey: ['character', characterBId],
    queryFn: async () => {
      if (!characterBId) throw new Error('Character B ID is required');

      // Check cache first
      const cachedCharacter = findCharacterInCache(queryClient, characterBId);
      if (cachedCharacter) {
        return { character: cachedCharacter };
      }

      // Fetch if not in cache
      const data = await graphqlClient.request<CharacterResponse>(GET_CHARACTER_BY_ID, {
        id: characterBId,
      });
      return data;
    },
    enabled: enabled && Boolean(characterBId),
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = queryA.isLoading || queryB.isLoading;
  const isError = queryA.isError || queryB.isError;
  const error = queryA.error || queryB.error;

  let analysis: EpisodeAnalysis | null = null;

  if (queryA.data && queryB.data) {
    analysis = analyzeEpisodes(queryA.data.character.episode, queryB.data.character.episode);
  }

  return {
    analysis,
    isLoading,
    isError,
    error,
    characterA: queryA.data?.character,
    characterB: queryB.data?.character,
  };
};
