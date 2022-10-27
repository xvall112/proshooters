import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
//components
//product has imperted from components
import Product from "../../../../components/product/Product";
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
        slides: { perView: 2.3, spacing: 15 },
      },
      "(min-width: 900px)": {
        slides: { perView: 4, spacing: 15 },
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
      <Grid container item xs={12} ref={ref} className="keen-slider">
        {similarProducts.map((similarProduct: any) => (
          <Grid
            item
            xs={10}
            md={3}
            key={similarProduct.id}
            className="keen-slider__slide"
          >
            <Product product={similarProduct} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SimilarProducts;
