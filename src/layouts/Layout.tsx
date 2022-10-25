import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/ApolloClient";

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
