import React from "react";
import Image from "next/image";
import bannerImg from "../../../../images/banner/VE Banner 1436 x 250.png";
//materialUI
import Box from "@mui/material/Box";
const Banner = () => {
  return (
    <Box
      maxWidth={"1000px"}
      display={"block"}
      sx={{
        "& img": {
          borderRadius: "5px",
        },
        margin: "0 auto",
      }}
    >
      <Image
        src={bannerImg}
        alt="Banner Vizual Edge"
        layout="responsive"
        blurDataURL="data:..."
        placeholder="blur"
      />
    </Box>
  );
};

export default Banner;
