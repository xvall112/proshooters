import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import Carousel1 from "../../../../images/carousel/alexander-jawfox-Mu0ExSKTOBs-unsplash.jpg";
import Carousel2 from "../../../../images/carousel/Rectangle 1.png";
import ProductSliderControl from "./components/ProductSliderControl";
//MaterialUI
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const useStyles = makeStyles()((theme) => ({
  dot: {
    border: "none",
    width: "10px",
    height: "10px",
    background: " #c5c5c5",
    borderRadius: "50%",
    margin: " 0 5px",
    padding: "5px",
    cursor: " pointer",
    "&:focus": {
      outline: "none",
    },
    "&.active": {
      background: theme.palette.primary.main,
    },
  },
  dots: {
    display: "flex",
    padding: "10px 0 0 0",
    justifyContent: "center",
  },
  slider: {
    borderRadius: "5px",
    "& img": {
      borderRadius: "5px",
    },
  },
}));

const Carousel = () => {
  const theme = useTheme();
  const { classes } = useStyles();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className={`keen-slider ${classes.slider}`}>
          {isMd && loaded && instanceRef?.current && (
            <ProductSliderControl
              onPrev={() => instanceRef.current?.prev()}
              onNext={() => instanceRef.current?.next()}
            />
          )}
          <div className="keen-slider__slide">
            <Box sx={{ display: "grid" }}>
              <Box sx={{ gridArea: "1/1", height: 400 }}>
                <Image
                  src={Carousel1}
                  alt="carousel"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gridArea: "1/1",
                  height: 400,
                  overflow: "hidden",
                  zIndex: 10,
                  paddingX: { xs: 2, md: 15 },
                }}
              >
                <Typography
                  variant="h3"
                  color="text.primary"
                  sx={{ fontWeight: 700 }}
                  align={"center"}
                  gutterBottom
                >
                  <Typography
                    color={"primary"}
                    component={"span"}
                    variant={"inherit"}
                    sx={{
                      background: `linear-gradient(180deg, rgba(198,21,23,1) 32%, rgba(250,31,33,1) 100%)`,
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Terče pro IPSC střelbu
                  </Typography>
                </Typography>
                <Typography
                  variant="h6"
                  component={"p"}
                  color="common.white"
                  align={"center"}
                  fontWeight={300}
                  gutterBottom
                >
                  Kvalitní kovové a papírové terče vyhovující těm nejnáročnějším
                  podmínkám.
                </Typography>
                <Link href={"/terce"} passHref>
                  <a style={{ textDecoration: "none" }}>
                    <Button size={"large"} variant="contained">
                      Vice
                    </Button>
                  </a>
                </Link>
              </Box>
            </Box>
          </div>
          <div className="keen-slider__slide">
            <Image
              src={Carousel2}
              alt="carousel"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      {loaded && instanceRef.current && (
        <div className={classes.dots}>
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={
                  classes.dot + (currentSlide === idx ? " active" : "")
                }
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Carousel;
