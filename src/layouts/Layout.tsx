import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

type Props = {
  children?: React.ReactNode;
  parentCategories: any;
};
const Layout: React.FC<Props> = ({ children, parentCategories }) => {
  return (
    <>
      <Header parentCategories={parentCategories} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
