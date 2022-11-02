import React from "react";
import CartView from "../../src/views/cart/Cart";
import CartLayout from "../../src/layouts/CartLayout";

const Cart = () => {
  return (
    <CartLayout>
      <CartView />
    </CartLayout>
  );
};

export default Cart;
