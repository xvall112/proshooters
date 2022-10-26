import React, { useState, useEffect, createContext } from "react";
import { ICart, CartContextType } from "../types/appContext";
import { v4 } from "uuid";
import { isEmpty } from "lodash";
//GQL
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_CART from "../utils/gql/mutations/update-cart";
import GET_CART from "../utils/gql/queries/get-cart";
import CLEAR_CART_MUTATION from "../utils/gql//mutations/clear-cart";
import ADD_TO_CART from "../utils/gql/mutations/add-to-cart";
import { getFormattedCart, getUpdatedItems } from "../functions";

export const AppContext = createContext<CartContextType | null>({
  cart: {},
  setCart: () => {},
  handleAddToCartClick: () => {},
  addToCartLoading: false,
  updateCartProcessing: false,
  loadingCart: false,
  handleRemoveProductClick: (event, cartKey, products) => {},
  handleQtyChange: (event, cartKey, products) => {},
});

export const AppProvider = (props: any) => {
  const [cart, setCart] = useState<ICart>({});
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    // @TODO Will add option to show the cart with localStorage later.
    if (process.browser) {
      let cartData: any = localStorage.getItem("woo-next-cart");
      cartData = null !== cartData ? JSON.parse(cartData) : {};
      setCart(cartData);
    }
  }, []);

  const handleQtyChange = (count: any, cartKey: any, products: any) => {
    if (process.browser) {
      /*  event.stopPropagation(); */
      // If the previous update cart mutation request is still processing, then return.
      if (updateCartProcessing) {
        return;
      }
      // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
      const newQty = count ? parseInt(count) : 1;
      // Set the new qty in state.
      /* setProductCount( newQty ); */
      if (products.length) {
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
    }
  };
  //po stisknuti tlacitka pridat do kosiku
  const handleAddToCartClick = async (productId: string) => {
    setRequestError("");
    await addToCart({
      variables: {
        input: {
          clientMutationId: v4(), // Generate a unique id.
          productId: productId,
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

      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart === null ? {} : updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    refetchQueries: [
      { query: GET_CART }, // DocumentNode object parsed with gql
      "GET_CART", // Query name
    ],
    onCompleted: () => {
      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      /* refetch();
      console.log("addtocart cal refetch"); */
      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      if (error) {
        setRequestError(error?.graphQLErrors?.[0]?.message ?? "");
      }
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
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  // Clear Update Cart Mutation.
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

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCartClick,
        addToCartLoading,
        handleRemoveProductClick,
        updateCartProcessing,
        loadingCart,
        handleQtyChange,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
