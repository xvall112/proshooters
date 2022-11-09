import { gql } from "@apollo/client";

const UPDATE_SHIPPING_METHOD = gql`
  mutation updateShippingMethod($input: UpdateShippingMethodInput!) {
    updateShippingMethod(input: $input) {
      clientMutationId
      cart {
        chosenShippingMethods
        shippingTotal
        total
        subtotal
      }
    }
  }
`;

export default UPDATE_SHIPPING_METHOD;
