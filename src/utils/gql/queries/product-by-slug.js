import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      productId: databaseId
      averageRating
      slug
      description
      shortDescription
      galleryImages {
        nodes {
          id
          title
          altText
          mediaItemUrl
        }
      }
      image {
        id
        uri
        title
        srcSet
        sourceUrl
      }
      name
      ... on SimpleProduct {
        price
        id
        regularPrice
        salePrice
      }
      ... on VariableProduct {
        price
        id
        regularPrice
        salePrice
      }
      ... on ExternalProduct {
        price
        id
        regularPrice
        externalUrl
        salePrice
      }
      ... on GroupProduct {
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
              regularPrice
              salePrice
            }
          }
        }
        id
      }
    }
  }
`;

export const PRODUCT_SLUGS = gql`
  query Products {
    products(first: 5000) {
      nodes {
        id
        slug
      }
    }
  }
`;
