import React, { useState, useEffect, createContext } from "react";
import { ICart, CartContextType } from "../types/appContext";
import { v4 } from "uuid";
import { useQuery, useMutation } from "@apollo/client";
import GET_CART from "../utils/gql/queries/get-cart";
import ADD_TO_CART from "../utils/gql/mutations/add-to-cart";
import { getFormattedCart } from "../functions";

export const AppContext = createContext<CartContextType | null>({
  cart: {},
  setCart: () => {},
  handleAddToCartClick: () => {},
  addToCartLoading: false,
});

export const AppProvider = (props: any) => {
  const [cart, setCart] = useState<ICart>({});
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState("");
  console.log("appContext", cart);

  useEffect(() => {
    // @TODO Will add option to show the cart with localStorage later.
    if (process.browser) {
      let cartData: any = localStorage.getItem("woo-next-cart");
      cartData = null !== cartData ? JSON.parse(cartData) : {};
      setCart(cartData);
    }
  }, []);

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

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    onCompleted: (data) => {
      // Update cart in the localStorage.
      console.log("updatedCart", data);
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart === null ? {} : updatedCart);
      console.log("refetch");
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

  return (
    <AppContext.Provider
      value={{ cart, setCart, handleAddToCartClick, addToCartLoading }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
