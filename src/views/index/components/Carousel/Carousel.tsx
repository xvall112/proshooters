import React, { useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import Carousel1 from "../../../../images/carousel/alexander-jawfox-Mu0ExSKTOBs-unsplash.jpg";
import Carousel2 from "../../../../images/carousel/Rectangle 1.png";
import ProductSliderControl from "./components/ProductSliderControl";
import useMediaQuery from "@mui/material/useMediaQuery";

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
}));

const Carousel = () => {
  const theme = useTheme();
  const { classes } = useStyles();
  const sliderContainerRef = useRef<HTMLDivElement>(null);
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
        <div ref={sliderRef} className="keen-slider">
          {isMd && loaded && instanceRef?.current && (
            <ProductSliderControl
              onPrev={() => instanceRef.current?.prev()}
              onNext={() => instanceRef.current?.next()}
            />
          )}
          <div className="keen-slider__slide">
            <Image src={Carousel1} alt="carousel" width={1400} height={400} />
          </div>
          <div className="keen-slider__slide">
            <Image src={Carousel2} alt="carousel" width={1400} height={400} />
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
