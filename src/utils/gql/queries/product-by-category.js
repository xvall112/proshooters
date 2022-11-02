import { gql } from "@apollo/client";

export const PRODUCT_BY_CATEGORY_SLUG = gql`
  query PRODUCT_BY_CATEGORY_SLUG($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      name
      children {
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

      products(first: 50) {
        nodes {
          id
          productId: databaseId
          averageRating
          slug
          description
          shortDescription
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
            regularPrice
            salePrice
            id
          }
          ... on VariableProduct {
            price
            regularPrice
            id
          }
          ... on ExternalProduct {
            price
            id
            regularPrice
            externalUrl
          }
          ... on GroupProduct {
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  regularPrice
                  price
                }
              }
            }
            id
          }
        }
      }
    }
    parentCategories: productCategories(where: { parent: 0 }) {
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

export const PRODUCT_CATEGORIES_SLUGS = gql`
  query PRODUCT_CATEGORIES_SLUGS {
    productCategories {
      nodes {
        id
        slug
      }
    }
  }
`;
