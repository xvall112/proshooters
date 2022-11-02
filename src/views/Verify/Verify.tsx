import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { CartContextType } from "../../types/appContext";

const Verify = () => {
  const { setActiveStep, activeStep } = useContext(
    AppContext
  ) as CartContextType;

  useEffect(() => {
    setActiveStep(3);
  }, []);

  return (
    <div>
      <h1>Verify</h1>
    </div>
  );
};

export default Verify;
