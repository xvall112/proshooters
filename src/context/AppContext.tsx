import React, { useState, useEffect } from "react";
import { ICart, CartContextType } from "../types/appContext";

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
    <AppContext.Provider value={{ cart, setCart }}>
      {props.children}
    </AppContext.Provider>
  );
};
