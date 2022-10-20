import React from "react";
//MatrialUI
import Box from "@mui/material/Box";
//components
import Newsletter from "./components/Newsletter";
import Container from "../../../components/Container";
import Partners from "./components/Partners";
import Banner from "./components/Banner";
const Footer: React.FC = () => {
  return (
    <>
      <Box bgcolor={"alternate.main"}>
        <Container>
          <Newsletter />
        </Container>
      </Box>
      <Container>
        <Partners />
      </Container>
      <Container>
        <Banner />
      </Container>
    </>
  );
};

export default Footer;
