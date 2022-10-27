import React from "react";
import Container from "../../components/Container";
import Advantages from "./components/Advantages";
import Category from "./components/CategoryChild";
import Carousel from "./components/Carousel/Carousel";
import LatestProducts from "./components/LatestProducts";
//MaterialUI
import Grid from "@mui/material/Grid";
interface Props {
  productCategories: any;
  products: any;
}
const Index = ({ productCategories, products }: Props) => {
  return (
    <>
      <Container noPaddingY>
        <Carousel />
      </Container>
      <Container>
        <Grid container spacing={1}>
          {productCategories.map((productCategory: any) => {
            return (
              <Grid item xs={6} sm={4} md={2} key={productCategory.slug}>
                <Category catChildren={productCategory} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Container>
        <Advantages />
      </Container>
      <Container>
        <LatestProducts products={products} />
      </Container>
    </>
  );
};

export default Index;
