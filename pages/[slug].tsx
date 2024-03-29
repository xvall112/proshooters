import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import client from "../src/utils/ApolloClient";
import {
  PRODUCT_BY_CATEGORY_SLUG,
  PRODUCT_CATEGORIES_SLUGS,
} from "../src/utils/gql/queries/product-by-category";
//components
import Layout from "../src/layouts/Layout";
import Category from "../src/views/category/Category";

interface Props {
  categoryName: any;
  products: any;
  categoryChildren: any;
  parentCategories: any;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const CategorySingle = (props: Props) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { categoryName, products, categoryChildren, parentCategories } = props;

  return (
    <Layout parentCategories={parentCategories}>
      <Category
        categoryName={categoryName}
        products={products}
        categoryChildren={categoryChildren}
      />
    </Layout>
  );
};
export default CategorySingle;

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;

  const { data } = await client.query({
    query: PRODUCT_BY_CATEGORY_SLUG,
    variables: { slug },
  });

  return {
    props: {
      categoryChildren: data?.productCategory?.children.nodes ?? [],
      categoryName: data?.productCategory?.name ?? "",
      products: data?.productCategory?.products?.nodes ?? [],
      parentCategories: data?.parentCategories?.nodes,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  const pathsData: any = [];

  data?.productCategories?.nodes &&
    data?.productCategories?.nodes.map((productCategory: any) => {
      if (!isEmpty(productCategory?.slug)) {
        pathsData.push({ params: { slug: productCategory?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
};
