import React, { useState, useEffect } from "react";

interface ICart {
  products?: Array<{
    image: object;
    name: string;
    price: number;
    productId: number;
    qty: number;
    totalPrice: string;
  }>;
  totalProductsCount?: number;
  totalProductsPrice?: string;
}

type CartContextType = {
  cart: ICart;
};

export const AppContext = React.createContext<CartContextType | null>(null);

export const AppProvider = (props: any) => {
  const [cart, setCart] = useState<ICart>({});

  useEffect(() => {
    // @TODO Will add option to show the cart with localStorage later.
    if (process.browser) {
      let cartData: any = localStorage.getItem("woo-next-cart");
      cartData = null !== cartData ? JSON.parse(cartData) : {};
      setCart(cartData);
    }
  }, []);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  );
};
