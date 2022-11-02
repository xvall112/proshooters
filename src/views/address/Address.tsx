import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { CartContextType } from "../../types/appContext";

const Address = () => {
  const { setActiveStep, activeStep } = useContext(
    AppContext
  ) as CartContextType;

  useEffect(() => {
    setActiveStep(1);
  }, []);

  return (
    <div>
      <h1>Address</h1>
    </div>
  );
};

export default Address;
