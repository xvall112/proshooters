import React from "react";
import Link from "next/link";
import Image from "next/image";
//components
import Price from "../components/Price";
import AddToCartButton from "../../../components/AddToCartButton";
//MaterialUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useTheme } from "@mui/material/styles";

const LatestProducts = ({ products, title }: any): JSX.Element => {
  const theme = useTheme();

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h5"
          align={"left"}
          data-aos={"fade-up"}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 1, md: 4 }}>
        {undefined !== products && products?.length
          ? products.map((product: any, i: any) => (
              <Grid item xs={6} sm={6} md={3} key={i}>
                <Box display={"block"} width={1} height={1}>
                  <Box
                    component={Card}
                    elevation={3}
                    width={1}
                    height={1}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Link
                      href={`/product/${encodeURIComponent(product.slug)}`}
                      passHref
                    >
                      <a>
                        <CardMedia
                          sx={{
                            position: "relative",
                            height: { xs: "auto", sm: 340, md: 280 },
                            overflow: "hidden",
                            padding: 3,
                            paddingBottom: 0,

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            src={product?.image?.sourceUrl}
                            alt={product?.image?.altText}
                            width={300}
                            height={300}
                          />
                          {/* <Box
                            display={"flex"}
                            justifyContent={"flex-end"}
                            position={"absolute"}
                            top={0}
                            left={0}
                            right={0}
                            padding={2}
                            width={1}
                          >
                            <Box
                              component={IconButton}
                              color="secondary"
                              bgcolor={"background.paper"}
                              size={"large"}
                            >
                              <Box
                                component={"svg"}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                width={20}
                                height={20}
                                color={"secondary.main"}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </Box>
                            </Box>
                          </Box> */}
                        </CardMedia>
                      </a>
                    </Link>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",

                        height: "100%",
                      }}
                    >
                      <Link
                        href={`/product/${encodeURIComponent(product.slug)}`}
                        passHref
                      >
                        <a style={{ textDecoration: "none" }}>
                          <Typography
                            variant={"subtitle1"}
                            align={"left"}
                            sx={{
                              fontWeight: 700,
                            }}
                            color={theme.palette.text.primary}
                          >
                            {product.name}
                          </Typography>
                        </a>
                      </Link>
                      <Box sx={{ flexGrow: 1 }} />
                      <Box
                        display={"flex"}
                        justifyContent={"flex-start"}
                        marginY={1}
                      >
                        <Box display={"flex"} justifyContent={"center"}>
                          {[1, 2, 3, 4, 5].map((item) => (
                            <Box
                              key={item}
                              color={theme.palette.secondary.main}
                            >
                              <svg
                                width={18}
                                height={18}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      <CardActions
                        sx={{
                          alignItems: "center",
                          justifyContent: { xs: "center", md: "space-between" },
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                        }}
                      >
                        <Price
                          salesPrice={product.salePrice}
                          regularPrice={product.regularPrice}
                        />
                        {/*  <Typography sx={{ fontWeight: 700 }} color={"primary"}>
                          <Box
                            component="span"
                            dangerouslySetInnerHTML={{ __html: product?.price }}
                          />
                        </Typography> */}
                      </CardActions>
                      <AddToCartButton product={product} />
                    </CardContent>
                  </Box>
                </Box>
              </Grid>
            ))
          : ""}
      </Grid>
    </Box>
  );
};

export default LatestProducts;
