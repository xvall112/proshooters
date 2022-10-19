import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
//components
import Product from "./Product";
import { useKeenSlider } from "keen-slider/react";
interface Props {
  similarProducts: any;
  title: string;
}
const SimilarProducts: React.FC<Props> = ({
  similarProducts,
  title,
}): JSX.Element => {
  const theme = useTheme();
  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    slides: {
      perView: 1.2,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 2.3 },
      },
      "(min-width: 900px)": {
        slides: { perView: 4 },
      },
    },
  });
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant={"h5"} fontWeight={700}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div ref={ref} className="keen-slider">
          {similarProducts.map((similarProduct: any) => (
            <Box key={similarProduct.id} className="keen-slider__slide" px={1}>
              <Product product={similarProduct} />
            </Box>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default SimilarProducts;
