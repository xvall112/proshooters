import React, { useState, useEffect } from "react";
export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props: any) => {
  const [categories, setCategories] = useState("");
  const [cart, setCart] = useState<Provider>({});

  interface Provider {
    type?: object;
  }

  useEffect(() => {
    // @TODO Will add option to show the cart with localStorage later.
    if (process.browser) {
      let cartData = localStorage.getItem("woo-next-cart");
      cartData = null !== cartData ? JSON.parse(cartData) : "";
      setCart(cartData);
    }
  }, []);

  return (
    <AppContext.Provider value={[cart, setCart, categories, setCategories]}>
      {props.children}
    </AppContext.Provider>
  );
};