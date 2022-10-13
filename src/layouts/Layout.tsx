import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/ApolloClient";

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        {children}
        <Footer />
      </ApolloProvider>
    </>
  );
};

export default Layout;