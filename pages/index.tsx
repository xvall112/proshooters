import React from "react";
import { GetStaticProps } from "next";
import type { NextPage } from "next";
import Index from "../src/views/index/Index";
import client from "../src/utils/ApolloClient";
import GET_ALL_CATEGORIES_QUERY from "../src/utils/gql/queries/get-allCategories-and-Products";
import Layout from "../src/layouts/Layout";

const Home: NextPage = (props: any) => {
  const { productCategories, products, saleProducts } = props;
  return (
    <Layout>
      <Index
        productCategories={productCategories}
        products={products}
        saleProducts={saleProducts}
      />
    </Layout>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: GET_ALL_CATEGORIES_QUERY,
  });

  return {
    props: {
      productCategories: data?.productCategories?.nodes || [],
      products: data?.products?.nodes,
      saleProducts: data?.saleProducts?.nodes,
    },
    revalidate: 1,
  };
};
