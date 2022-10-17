import React from "react";
import Link from "next/link";
//materialUI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
  return (
    <>
      <Container>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            {categoryName ? (
              <Box component={Typography} variant="h4" fontWeight="bold">
                {categoryName}
              </Box>
            ) : (
              ""
            )}
          </Grid>
          <Grid
            item
            container
            spacing={1}
            xs={12}
            sx={{ marginBottom: theme.spacing(2) }}
          >
            {undefined !== categoryChildren && categoryChildren?.length
              ? categoryChildren.map((catChildren: any) => {
                  return (
                    <Grid item xs={12} md={2}>
                      <CategoryChildren catChildren={catChildren} />
                    </Grid>
                  );
                })
              : ""}
          </Grid>

          <Grid item xs={12}>
            {undefined !== categoryChildren && categoryChildren?.length ? (
              <Box component={Typography} variant="h5" fontWeight="bold">
                Nejnovější
              </Box>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} container spacing={6} direction="row">
            {undefined !== products && products?.length
              ? products.map((product: any) => {
                  return (
                    <Grid item xs={12} md={3} key={product.id}>
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
