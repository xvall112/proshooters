import React from "react";
import CartHeader from "./components/header/CartHeader";
import Footer from "./components/footer/Footer";

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <CartHeader />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
