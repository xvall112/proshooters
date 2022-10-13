import React from "react";
import Link from "next/link";
//materialUI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
//components
import Container from "../../components/Container";
import Product from "./components/product";

interface Props {
  categoryName: string;
  products: any;
}

const Category = ({ categoryName, products }: Props) => {
  return (
    <Container>
      {categoryName ? (
        <Typography variant="h4" fontWeight="bold">
          {categoryName}
        </Typography>
      ) : (
        ""
      )}
      <Grid container spacing={8} direction="row">
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
    </Container>
  );
};

export default Category;
