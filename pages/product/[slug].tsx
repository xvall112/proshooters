import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import client from "../../src/utils/ApolloClient";
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS,
} from "../../src/utils/gql/queries/product-by-slug";
import { isEmpty } from "lodash";

//components
import ProductOverview from "../../src/views/ProductOverview/ProductOverview";
import Layout from "../../src/layouts/Layout";

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function Product(props: any) {
  const { product } = props;

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        <ProductOverview product={product} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;

  const { data } = await client.query({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug },
  });

  return {
    props: {
      product: data?.product || {},
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: PRODUCT_SLUGS,
  });

  const pathsData: any = [];

  data?.products?.nodes &&
    data?.products?.nodes.map((product: any) => {
      if (!isEmpty(product?.slug)) {
        pathsData.push({ params: { slug: product?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
};
