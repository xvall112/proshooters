import React from "react";
//components
import Overview from "./components/Overview";
import Container from "../../components/Container";
import Advantages from "./components/Advantages";
import Category from "./components/CategoryChild";
import Carousel from "./components/Carousel/Carousel";
import LatestProducts from "./components/LatestProducts";
import VideoSection from "./components/VideoSection";
//MaterialUI
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
interface Props {
  productCategories: any;
  products: any;
  saleProducts: any;
}
const Index = ({ productCategories, products, saleProducts }: Props) => {
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
      <Box bgcolor={"alternate.main"}>
        <Container>
          <Advantages />
        </Container>
      </Box>
      <Container>
        <LatestProducts products={saleProducts} title={"Cenové trháky"} />
      </Container>
      <Container>
        <LatestProducts products={products} title={"Novinky"} />
      </Container>
      <Container>
        <Overview />
      </Container>

      <Container>
        <VideoSection />
      </Container>
    </>
  );
};

export default Index;
