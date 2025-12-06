export const GET_CHARACTERS = `
  query GetCharacters($page: Int!, $name: String, $status: String, $species: String) {
    characters(page: $page, filter: { name: $name, status: $status, species: $species }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
        }
        location {
          id
          name
        }
        image
        episode {
          id
          name
          air_date
          episode
        }
      }
    }
  }
`;

/**
 * Query to fetch a single character by ID with all episodes
 */
export const GET_CHARACTER_BY_ID = `
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

/**
 * Query to fetch multiple episodes by IDs
 */
export const GET_EPISODES_BY_IDS = `
  query GetEpisodesByIds($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      name
      air_date
      episode
    }
  }
`;
