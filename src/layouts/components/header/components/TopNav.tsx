import React from "react";
import Box from "@mui/material/Box";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
/* import ThemeModeToggler from 'components/ThemeModeToggler'; */

interface Props {
  colorInvert?: boolean;
}

const TopNav = ({ colorInvert = false }: Props): JSX.Element => {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      sx={{ color: "white" }}
    >
      <Box marginRight={{ xs: 1, sm: 2 }} display={"flex"} alignItems="center">
        <MailOutlineIcon color="inherit" />
        <Box
          component="a"
          href="mailto:admin@proshooters.cz"
          sx={{ color: "white", textDecoration: "none", fontSize: "12px" }}
          pl={1}
        >
          admin@proshooters.cz
        </Box>
      </Box>
      <Box marginRight={{ xs: 1, sm: 2 }} display={"flex"} alignItems="center">
        <PhoneIphoneIcon color="inherit" />
        <Box
          component="a"
          href="tel:+420734847762"
          sx={{
            color: "white",
            textDecoration: "none !important",
            fontSize: "12px",
          }}
        >
          +420 734 847 762
        </Box>
      </Box>
      <Box marginRight={{ xs: 1, sm: 2 }}></Box>
      {/*  <Box>
        <ThemeModeToggler />
      </Box> */}
    </Box>
  );
};

export default TopNav;
