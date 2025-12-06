import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { GET_CHARACTERS } from '@/lib/queries';
import { CharactersResponse } from '@/types';

interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
}

export const useCharacters = (page: number = 1, filters?: CharacterFilters) => {
  return useQuery<CharactersResponse>({
    queryKey: ['characters', page, filters],
    queryFn: async () => {
      const data = await graphqlClient.request<CharactersResponse>(GET_CHARACTERS, {
        page,
        name: filters?.name || undefined,
        status: filters?.status || undefined,
        species: filters?.species || undefined,
      });
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
