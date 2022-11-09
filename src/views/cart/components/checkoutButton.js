import jwtDecode from "jwt-decode";
import React, { useState } from "react";

const CheckoutButton = () => {
  const [session] = useState(() => {
    try {
      // Get the session from whatever mechanism you're storing it in: localstorage, context, state, etc
      const jwtSession = process.browser
        ? localStorage.getItem("woo-session")
        : "";

      // jtw-decode is an open-source package
      const decoded = jwtDecode(jwtSession);

      return decoded.data.customer_id;
    } catch (error) {
      console.error(error.message);

      return null;
    }
  });

  return (
    <a href={`https://proshooters.cz/?session_id=${session}`}>
      Proceed to checkout
    </a>
  );
};

export default CheckoutButton;
