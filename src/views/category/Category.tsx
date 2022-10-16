import React from "react";
import Link from "next/link";
//materialUI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
//components
import Container from "../../components/Container";
import Product from "./components/Product";
import CategoryChildren from "./components/CategoryChild";
interface Props {
  categoryName: string;
  products: any;
  categoryChildren: any;
}

const Category = ({ categoryName, products, categoryChildren }: Props) => {
  return (
    <>
      <Container>
        <Grid container spacing={2} direction="column">
          <Grid xs={12}>
            {categoryName ? (
              <Box component={Typography} variant="h4" fontWeight="bold">
                {categoryName}
              </Box>
            ) : (
              ""
            )}
          </Grid>
          <Grid container xs={12}>
            {undefined !== categoryChildren && categoryChildren?.length
              ? categoryChildren.map((catChildren: any) => {
                  return (
                    <Grid xs={6} md={2}>
                      <CategoryChildren catChildren={catChildren} />
                    </Grid>
                  );
                })
              : ""}
          </Grid>
          <Grid xs={12} container spacing={8} direction="row">
            {undefined !== products && products?.length
              ? products.map((product: any) => {
                  return (
                    <Grid xs={12} md={3} key={product.id}>
                      <Product product={product} />
                    </Grid>
                  );
                })
              : ""}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Category;
