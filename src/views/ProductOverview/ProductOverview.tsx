import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { isEmpty } from "lodash";
import { ProductSlider } from "./components/ProductSlider/ProductSlider";
import { Headline, Details, SimilarProducts } from "./components";

import Describe from "./components/Reviews/Describe";
import Container from "../../components/Container";

const mock = {
  reviewScore: 4,
  reviewCount: 519,
};

interface Props {
  product: any;
}
const ProductOverview = ({ product }: Props): JSX.Element => {
  return (
    <>
      <Box bgcolor={"alternate.main"}>
        <Container paddingY={{ xs: 2, sm: 2.5 }}>
          <Headline productCategories={product.productCategories.nodes} />
        </Container>
      </Box>
      <Container>
        <Box>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md={8}>
              <ProductSlider key={product.id}>
                {product.galleryImages.nodes.map((image: any, i) => (
                  <Box
                    sx={{
                      textAlign: "center",
                      position: "relative",
                    }}
                    key={image.mediaItemUrl} /* className={s.imageContainer} */
                  >
                    <Image
                      /* className={s.img} */
                      src={image.mediaItemUrl!}
                      alt={image.altText || "Product Image"}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"
                    />
                  </Box>
                ))}
              </ProductSlider>
            </Grid>
            <Grid item xs={12} md={4}>
              <Details
                reviewCount={mock.reviewCount}
                reviewScore={mock.reviewScore}
                product={product}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* <Container paddingY={4} id="reviews">
        <Divider />
      </Container> */}
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
      {/* related products, generuje je woocommerce */}
      {!isEmpty(product.related.nodes) && (
        <Container>
          <SimilarProducts
            similarProducts={product.related.nodes}
            title={"Podobné produkty"}
          />
        </Container>
      )}
      {/* upsell produkty, zadavaji se ve woocommerce */}
      {!isEmpty(product.upsell.nodes) && (
        <Container>
          <SimilarProducts
            similarProducts={product.upsell.nodes}
            title={"Lidé také nakupují"}
          />
        </Container>
      )}
    </>
  );
};

export default ProductOverview;
