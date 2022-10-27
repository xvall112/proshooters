import { gql } from "@apollo/client";

/**
 * GraphQL all categories query.
 */
const GET_ALL_CATEGORIES_QUERY = gql`
  query {
    productCategories {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export default GET_ALL_CATEGORIES_QUERY;
