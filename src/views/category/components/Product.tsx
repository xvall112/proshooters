import React from "react";
import Link from "next/link";
import Image from "../../../components/Image";
import { DEFAULT_PRODUCT_HOME_IMG_URL } from "../../../constants/urls";

//materialUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
//components
import AddToCartButton from "../../../components/AddToCartButton";
interface Props {
  product: any;
}

const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  const theme = useTheme();
  return (
    <Button
      component="a"
      onClick={onClick}
      ref={ref}
      href={href}
      size={"large"}
      sx={{
        color: theme.palette.text.primary,
        marginTop: 1,
      }}
      fullWidth
    >
      Detail produktu
    </Button>
  );
});

const Product = ({ product }: Props) => {
  const { slug, name, image, price } = product;
  const theme = useTheme();
  return (
    <>
      <Box display={"block"} width={1} height={1}>
        <Card
          sx={{
            width: 1,
            height: 1,
            display: "flex",
            flexDirection: "column",
            boxShadow: "none",
            bgcolor: "transparent",
            backgroundImage: "none",
            alignItems: "stretch",
          }}
        >
          <Image
            width="308"
            height="308"
            loading="lazy"
            sourceUrl={image?.sourceUrl ?? ""}
            defaultImgUrl={DEFAULT_PRODUCT_HOME_IMG_URL}
            altText={image?.altText ?? slug}
          />
          <Box marginTop={2}>
            <Typography fontWeight={700} sx={{ textTransform: "uppercase" }}>
              {name}
            </Typography>
            <Typography variant={"subtitle2"} color={"text.secondary"}>
              "description"
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            marginTop={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={700}>{price}</Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Box display={"flex"} alignItems={"center"}>
                {[1, 2, 3, 4, 5].map((r) => (
                  <Box
                    key={r}
                    component={"svg"}
                    color={
                      r <= 5
                        ? theme.palette.secondary.main
                        : theme.palette.divider
                    }
                    width={16}
                    height={16}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </Box>
                ))}
              </Box>
              <Typography
                variant={"caption"}
                color={"text.secondary"}
                marginLeft={0.5}
              >
                10 reviews
              </Typography>
            </Box>
          </Box>
          <Box marginTop={2}>
            <AddToCartButton product={product} />
            <Link href={`/product/${encodeURIComponent(slug)}`} passHref>
              <MyButton />
            </Link>
          </Box>
        </Card>
      </Box>

      {/* <Link href={`/product/${slug}`}>
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

      <Box
        component={Typography}
        variant="body2"
        fontWeight="bold"
        textAlign="center"
      >
        {name ? name : ""}
      </Box> */}

      {/* <Price salesPrice={product?.price} regularPrice={product?.regularPrice}/>
  <AddToCartButton product={ product }/> */}
    </>
  );
};

export default Product;
