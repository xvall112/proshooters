import React from "react";
import Link from "next/link";
import Image from "../../../components/Image";
import { DEFAULT_PRODUCT_HOME_IMG_URL } from "../../../constants/urls";

//materialUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

interface Props {
  product: any;
}

const Product = ({ product }: Props) => {
  const { slug, name, image } = product;

  return (
    <>
      <Link href={`/product/${slug}`}>
        <Box component="a" sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            width="308"
            height="308"
            loading="lazy"
            sourceUrl={image?.sourceUrl ?? ""}
            defaultImgUrl={DEFAULT_PRODUCT_HOME_IMG_URL}
            altText={image?.altText ?? slug}
          />
        </Box>
      </Link>

      <Box component={Typography} variant="h6" textAlign="center">
        {name ? name : ""}
      </Box>

      {/* <Price salesPrice={product?.price} regularPrice={product?.regularPrice}/>
  <AddToCartButton product={ product }/> */}
    </>
  );
};

export default Product;
