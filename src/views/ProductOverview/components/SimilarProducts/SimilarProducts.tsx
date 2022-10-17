import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material/styles";
//components
import Product from "./Product";
import Price from "./Price";
const mock = [
  {
    media: "https://assets.maccarianagency.com/backgrounds/img56.jpg",
    title: "Adidas shoes",
    description: "Discover the new collection of Adidas.",
    price: "$69.90",
    href: "#",
    reviewScore: 5,
    reviewCount: 12,
  },
  {
    media: "https://assets.maccarianagency.com/backgrounds/img63.jpg",
    title: "Colorful shoes",
    description: "Colorful shoes designed for everyone.",
    price: "$39.90",
    reviewScore: 4,
    reviewCount: 6,
  },
  {
    media: "https://assets.maccarianagency.com/backgrounds/img57.jpg",
    title: "Nike",
    description: "New arrivals of Nike sport shoes.",
    price: "$49.90",
    href: "#",
    reviewScore: 5,
    reviewCount: 8,
  },
  {
    media: "https://assets.maccarianagency.com/backgrounds/img58.jpg",
    title: "Sneakers",
    description: "Trendy Sneakers designed for everyone.",
    price: "$59.90",
    reviewScore: 4,
    reviewCount: 10,
  },
];

const SimilarProducts = ({ similarProducts, title }): JSX.Element => {
  const theme = useTheme();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant={"h5"} fontWeight={700}>
          {title}
        </Typography>
      </Grid>
      {similarProducts.map((similarProduct) => (
        <Grid item xs={12} sm={6} md={3} key={similarProduct.id}>
          <Product product={similarProduct} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SimilarProducts;
