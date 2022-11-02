import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { CartContextType } from "../../types/appContext";

const Payment = () => {
  const { setActiveStep, activeStep } = useContext(
    AppContext
  ) as CartContextType;

  useEffect(() => {
    setActiveStep(2);
  }, []);

  return (
    <div>
      <h1>Payment</h1>
    </div>
  );
};

export default Payment;
