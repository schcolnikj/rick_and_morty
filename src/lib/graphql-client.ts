import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from './constants';

/**
 * GraphQL client instance for Rick and Morty API
 * Configured with the official GraphQL endpoint
 */
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});
