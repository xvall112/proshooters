import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
//materialUI
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import logo from "../../../../images/pro-shooters_lg_web.svg";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

//context
import { AppContext } from "../../../../context/AppContext";
//types
import { CartContextType } from "../../../../types/appContext";

//Link modification
const MyLinkLogo = React.forwardRef(({ onClick, href }: any, ref) => {
  return (
    <Box component="a" onClick={onClick} ref={ref} href={href}>
      <Image
        src={logo}
        alt="Logo Pro Shooters"
        width={70}
        height={70}
        blurDataURL="data:..."
        placeholder="blur"
      />
    </Box>
  );
});

const MyLinkCart = React.forwardRef(({ onClick, href }: any, ref) => {
  return (
    <Box component="a" onClick={onClick} ref={ref} href={href}>
      <LocalMallIcon fontSize="large" color="secondary" />
    </Box>
  );
});
const steps = [
  "Košík",
  "Doprava a platba",
  "Dodací údaje",
  "Rekapitulace",
  "Hotovo",
];

const CartNavBar: React.FC = () => {
  const { cart, activeStep } = useContext(AppContext) as CartContextType;
  const productsCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : null;

  const router = useRouter();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={{ xs: 0, md: 2 }}
      sx={{ gridAutoFlow: "row dense" }}
    >
      <Grid item xs={3} md={1} sx={{ order: { xs: 1, md: 1 } }}>
        <Link href="/" passHref>
          <MyLinkLogo />
        </Link>
      </Grid>

      <Grid
        item
        container
        xs={12}
        md={9}
        alignItems="center"
        sx={{ order: { xs: 3, md: 2 } }}
      >
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={6}
        md={2}
        direction="row"
        justifyContent="flex-end"
        sx={{ order: { xs: 2, md: 3 } }}
      >
        <SearchIcon fontSize="large" color="secondary" />
        <Box px={2}>
          <PersonIcon fontSize="large" color="secondary" />
        </Box>
        <Badge
          color="primary"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={productsCount ? productsCount : null}
        >
          <Link href="/checkout/cart" passHref>
            <MyLinkCart />
          </Link>
        </Badge>
      </Grid>
    </Grid>
  );
};

export default CartNavBar;
