import React from "react";
import AddressView from "../../src/views/address/Address";
import CartLayout from "../../src/layouts/CartLayout";

const Address = () => {
  return (
    <CartLayout>
      <AddressView />
    </CartLayout>
  );
};

export default Address;
