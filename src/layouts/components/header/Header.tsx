import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import Container from "../../../components/Container";
import TopNav from "./components/TopNav";
import NavBar from "./components/NavBar";
import { PropsOf } from "@emotion/react";

interface Props {
  parentCategories: any;
}

const Header: React.FC<Props> = ({ parentCategories }) => {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });
  return (
    <AppBar position={"sticky"} elevation={trigger ? 1 : 0} color="inherit">
      <Box
        position={"relative"}
        zIndex={theme.zIndex.appBar}
        bgcolor={theme.palette.primary.main}
      >
        <Container
          paddingTop={"8px !important"}
          paddingBottom={"8px !important"}
        >
          <TopNav />
        </Container>
      </Box>
      <Container paddingY={1}>
        <NavBar parentCategories={parentCategories} />
      </Container>
    </AppBar>
  );
};

export default Header;
