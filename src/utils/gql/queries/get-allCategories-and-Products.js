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
    products(first: 4) {
      nodes {
        id
        productId: databaseId
        averageRating
        slug
        description
        image {
          id
          altText
          sourceUrl
        }
        name
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          id
        }
        ... on VariableProduct {
          price
          id
          regularPrice
        }
        ... on ExternalProduct {
          price
          id
          externalUrl
          regularPrice
        }
        ... on GroupProduct {
          id
          products {
            nodes {
              ... on SimpleProduct {
                id
                price
                regularPrice
              }
            }
          }
        }
      }
    }
    saleProducts: products(first: 4, where: { onSale: true }) {
      nodes {
        id
        productId: databaseId
        averageRating
        slug
        description
        image {
          id
          altText
          sourceUrl
        }
        name
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          id
        }
        ... on VariableProduct {
          price
          id
          regularPrice
        }
        ... on ExternalProduct {
          price
          id
          externalUrl
          regularPrice
        }
        ... on GroupProduct {
          id
          products {
            nodes {
              ... on SimpleProduct {
                id
                price
                regularPrice
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_ALL_CATEGORIES_QUERY;
