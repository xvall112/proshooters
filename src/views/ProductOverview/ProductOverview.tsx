import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { isEmpty } from "lodash";

import {
  Headline,
  Image,
  Details,
  SimilarProducts,
  Newsletter,
} from "./components";

import Describe from "./components/Describe";
import Container from "../../components/Container";

const mock = {
  images: [
    "https://assets.maccarianagency.com/backgrounds/img57.jpg",
    "https://assets.maccarianagency.com/backgrounds/img56.jpg",
    "https://assets.maccarianagency.com/backgrounds/img58.jpg",
  ],
  title: "Sport shoes",
  description:
    "The finishes of this product are very realistic with a double stitching on the neck, sleeves and bottom, and with a banded neck cleaning that allows optimal support in all situations.",
  price: "$59.99",
  reviewScore: 4,
  reviewCount: 519,
};

interface Props {
  product: any;
}
const ProductOverview = ({ product }: Props): JSX.Element => {
  console.log(product.related);
  return (
    <>
      <Box bgcolor={"alternate.main"}>
        <Container paddingY={{ xs: 2, sm: 2.5 }}>
          <Headline />
        </Container>
      </Box>
      <Container>
        <Box>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md={7}>
              <Image images={mock.images} title={mock.title} />
            </Grid>
            <Grid item xs={12} md={5}>
              <Details
                reviewCount={mock.reviewCount}
                reviewScore={mock.reviewScore}
                product={product}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container paddingY={4} id="reviews">
        <Divider />
      </Container>
      <Container>
        <Describe
          description={
            product.description ? product.description : product.shortDescription
          }
        />
      </Container>
      <Container paddingY={4}>
        <Divider />
      </Container>
      {!isEmpty(product.related.nodes) && (
        <Container>
          <SimilarProducts
            similarProducts={product.related.nodes}
            title={"Related products"}
          />
        </Container>
      )}
      {!isEmpty(product.upsell.nodes) && (
        <Container>
          <SimilarProducts
            similarProducts={product.upsell.nodes}
            title={"Upsell Product"}
          />
        </Container>
      )}

      <Box bgcolor={"alternate.main"}>
        <Container>
          <Newsletter />
        </Container>
      </Box>
    </>
  );
};

export default ProductOverview;