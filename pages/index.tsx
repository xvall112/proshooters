import React from "react";
import type { NextPage } from "next";
import Index from "../src/views/index/Index";
import client from "../src/utils/ApolloClient";
import GET_CATEGORIES_QUERY from "../src/utils/gql/queries/get-categories";

const Home: NextPage = (props) => {
  return <Index />;
};
export default Home;

/* export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_CATEGORIES_QUERY,
  });

  return {
    props: {
      productCategories: data?.productCategories?.nodes || [],
    },
    revalidate: 1,
  };
} */
