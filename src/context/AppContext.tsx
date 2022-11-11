import React, { useState, useEffect, createContext } from "react";
import { createCheckoutData } from "../functions";
import {
  ICart,
  CartContextType,
  IOriginCart,
  IOrderInput,
  IDelivery,
} from "../types/appContext";
import { v4 } from "uuid";
import { isEmpty } from "lodash";
//GQL
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_CART from "../utils/gql/mutations/update-cart";
import GET_CART from "../utils/gql/queries/get-cart";
import CLEAR_CART_MUTATION from "../utils/gql//mutations/clear-cart";
import CHECKOUT_MUTATION from "../utils/gql/mutations/checkout";
import { getFormattedCart, getUpdatedItems } from "../functions";
import { getCreateOrderData, createTheOrder } from "../utils/order";
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
  setCreateOrderInput: (input) => {},
  createOrderInput: {},
  handleSetDelivery: (title, price) => {},
  delivery: { price: 0, title: null },
  setPointZasilkovna: (point) => {},
  pointZasilkovna: {},
  createCheckout: () => {},
  createOrder: () => {},
});

export const AppProvider = (props: any) => {
  const [pointZasilkovna, setPointZasilkovna] = useState<any>({
    point: null,
  });
  const [orderData, setOrderData] = useState<any>(null);
  const [createOrderInput, setCreateOrderInput] = useState<IOrderInput>({});
  const [delivery, setDelivery] = useState<IDelivery>({
    title: null,
    price: 0,
  });
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

  useEffect(() => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      checkout();
    }
  }, [orderData]);

  //set delivery title and price use it in summary box
  const handleSetDelivery = (title: string, price: number) => {
    setDelivery((prevState: any) => {
      return {
        ...prevState,
        title: title,
        price: price,
      };
    });
  };

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

  //create order
  const createOrder = async () => {
    const orderData = await getCreateOrderData(createOrderInput, cart.products);

    await createTheOrder(orderData, setMessage, "");
  };

  const createCheckout = () => {
    const checkOutData = createCheckoutData(createOrderInput);

    /**
     *  When order data is set, checkout mutation will automatically be called,
     *  because 'orderData' is added in useEffect as a dependency.
     */
    setOrderData(checkOutData);
  };

  // Create New order: Checkout Mutation.
  const [checkout, { data: checkoutResponse, loading: checkoutLoading }] =
    useMutation(CHECKOUT_MUTATION, {
      variables: {
        input: orderData,
      },
      onError: (error) => {
        if (error) {
          setMessage("error", `${error.message}`);
        }
      },
    });
  return (
    <AppContext.Provider
      value={{
        setPointZasilkovna,
        pointZasilkovna,
        delivery,
        handleSetDelivery,
        setCreateOrderInput,
        createOrderInput,
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
        createCheckout,
        createOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
