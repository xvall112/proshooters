import React, { useState, useEffect, createContext } from "react";
import { ICart, CartContextType, IOriginCart } from "../types/appContext";
import { v4 } from "uuid";
import { isEmpty } from "lodash";
//GQL
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_CART from "../utils/gql/mutations/update-cart";
import GET_CART from "../utils/gql/queries/get-cart";
import CLEAR_CART_MUTATION from "../utils/gql//mutations/clear-cart";
import { getFormattedCart, getUpdatedItems } from "../functions";
import { VariantType, useSnackbar } from "notistack";

export const AppContext = createContext<CartContextType | null>({
  cart: {},
  setCart: () => {},
  updateCartProcessing: false,
  loadingCart: false,
  handleRemoveProductClick: (event, cartKey, products) => {},
  handleQtyChange: (updatedItems) => {},
  originCart: {},
  setMessage: (variant, message) => {},
  setActiveStep: (step) => {},
  activeStep: 0,
});

export const AppProvider = (props: any) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [originCart, setOriginCart] = useState<IOriginCart>({});
  const [cart, setCart] = useState<ICart>({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // @TODO Will add option to show the cart with localStorage later.
    if (process.browser) {
      let cartData: any = localStorage.getItem("woo-next-cart");
      cartData = null !== cartData ? JSON.parse(cartData) : {};
      setCart(cartData);
    }
  }, []);

  const setMessage = (
    variant: VariantType = "info",
    message: string = "info"
  ) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(`${message}`, { variant });
  };

  const handleQtyChange = (updatedItems: any) => {
    updateCart({
      variables: {
        input: {
          clientMutationId: v4(),
          items: updatedItems,
        },
      },
    });
  };

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

  // Get Cart Data.
  const {
    data,
    loading: loadingCart,
    refetch,
  } = useQuery(GET_CART, {
    onCompleted: (data) => {
      // Update cart in the localStorage.

      setOriginCart(data.cart);
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart === null ? {} : updatedCart);
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
    refetchQueries: [
      { query: GET_CART }, // DocumentNode object parsed with gql
      "GET_CART", // Query name
    ],
    onError: (error) => {
      setMessage("error", `${error.message}`);
    },
  });

  // Clear Update Cart Mutation.
  const [
    clearCart,
    { data: clearCartRes, loading: clearCartProcessing, error: clearCartError },
  ] = useMutation(CLEAR_CART_MUTATION, {
    refetchQueries: [
      { query: GET_CART }, // DocumentNode object parsed with gql
      "GET_CART", // Query name
    ],
    onError: (error) => {
      setMessage("error", `${error.message}`);
    },
  });

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        handleRemoveProductClick,
        updateCartProcessing,
        loadingCart,
        handleQtyChange,
        originCart,
        setMessage,
        setActiveStep,
        activeStep,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
