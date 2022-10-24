import React, { useContext, useState } from "react";
import Container from "../../components/Container";
import { AppContext } from "../../context/AppContext";
import { getFormattedCart, getUpdatedItems } from "../../functions";
import { isEmpty } from "lodash";
import { v4 } from "uuid";
//GQL
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_CART from "../../utils/gql/mutations/update-cart";
import GET_CART from "../../utils/gql/queries/get-cart";
import CLEAR_CART_MUTATION from "../../utils/gql//mutations/clear-cart";
//components
import EmptyCart from "./components/EmptyCart";
import Orders from "./components/Orders";
import SummeryBox from "./components/SummeryBox";
//materialUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
//types
import { CartContextType } from "../../types/appContext";

const Cart = () => {
  const { cart, setCart } = useContext(AppContext) as CartContextType;
  const [requestError, setRequestError] = useState("");
  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart || {});
    },
  });

  // Update Cart Mutation.
  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  // Update Cart Mutation.
  const [
    clearCart,
    { data: clearCartRes, loading: clearCartProcessing, error: clearCartError },
  ] = useMutation(CLEAR_CART_MUTATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = !isEmpty(error?.graphQLErrors?.[0])
          ? error.graphQLErrors[0]?.message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (
    event: any,
    cartKey: any,
    products: any
  ) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  return (
    <>
      <Container>
        {cart !== "" ? (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" fontWeight={700} marginBottom={4}>
                  Váš nákupní košík
                </Typography>
                {cart.products?.length &&
                  cart.products.map((item: any) => (
                    <Orders
                      key={item.productId}
                      item={item}
                      updateCartProcessing={updateCartProcessing}
                      products={cart.products}
                      handleRemoveProductClick={handleRemoveProductClick}
                      updateCart={updateCart}
                    />
                  ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: "alternate.main",
                    padding: { xs: 2, sm: 4 },
                  }}
                >
                  <Typography variant="h6" fontWeight={700} marginBottom={4}>
                    Celkem
                  </Typography>
                  <SummeryBox totalProductsPrice={cart.totalProductsPrice} />
                </Card>
                <Box marginTop={4}>
                  <Typography gutterBottom>Potřebujete poradit?</Typography>
                  <Stack direction={"row"} spacing={2}>
                    <Button
                      sx={{
                        color: "text.secondary",
                      }}
                      startIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      }
                    >
                      Telefon
                    </Button>
                    <Button
                      sx={{
                        color: "text.secondary",
                      }}
                      startIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      }
                    >
                      Email
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
            {cart &&
              cart.products?.length &&
              cart.products.map((item) => item.name)}
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </>
  );
};

export default Cart;
