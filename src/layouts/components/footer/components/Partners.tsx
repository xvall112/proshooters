import React from "react";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Brand1 from "../../../../images/brands/akta non verba 2.png";
import Brand2 from "../../../../images/brands/DAA logo.png";
import Brand3 from "../../../../images/brands/earmore.png";
import Brand4 from "../../../../images/brands/ghost logo.png";
import Brand5 from "../../../../images/brands/helikon-tex.png";
import Brand6 from "../../../../images/brands/Lok logo w txt-horizontal (1).png";
import Brand7 from "../../../../images/brands/WX_logo_black_registered_lg.jpg";

const brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6, Brand7];

const Partners = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {brands.map((brand, i) => (
        <Grid item xs={6} md={2} key={i}>
          <Box
            marginX={{ xs: 2, md: 3 }}
            marginY={{ xs: 2, md: 3 }}
            sx={{ display: "block" }}
          >
            <Image
              src={brand}
              alt="Brands"
              layout="responsive"
              blurDataURL="data:..."
              placeholder="blur"
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Partners;
