import React from "react";
import PaymentView from "../../src/views/Payment/Payment";
import CartLayout from "../../src/layouts/CartLayout";

const Payment = () => {
  return (
    <CartLayout>
      <PaymentView />
    </CartLayout>
  );
};

export default Payment;
