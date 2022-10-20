import { FC, MouseEventHandler, memo } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
//MUIcomponents
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";

interface ProductSliderControl {
  onPrev: MouseEventHandler<HTMLButtonElement>;
  onNext: MouseEventHandler<HTMLButtonElement>;
}

const ProductSliderControl: FC<ProductSliderControl> = ({ onPrev, onNext }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{
        bottom: "45%",
        position: "absolute",
        zIndex: 30,
      }}
    >
      <Box
        component={"button"}
        sx={{
          paddingY: "20px",
          borderRadius: "5px",
          border: "none",
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer",
          },
        }}
        onClick={onPrev}
        aria-label="Previous Product Image"
      >
        <ArrowBackIosNewIcon />
      </Box>
      <Box
        component={"button"}
        onClick={onNext}
        aria-label="Next Product Image"
        sx={{
          paddingY: "20px",
          borderRadius: "5px",
          border: "none",
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            cursor: "pointer",
          },
        }}
      >
        <ArrowForwardIosIcon />
      </Box>
    </Grid>
  );
};

export default memo(ProductSliderControl);
