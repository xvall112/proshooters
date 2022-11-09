import { gql } from "@apollo/client";

export const GET_SHIPPING_METHODS = gql`
  query GET_SHIPPING_METHODS {
    shippingMethods {
      nodes {
        title
        id
        description
        databaseId
      }
    }
  }
`;
