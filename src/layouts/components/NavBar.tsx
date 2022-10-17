import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import GET_CATEGORIES_QUERY from "../../utils/gql/queries/get-categories";
//materialUI
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import Grid from "@mui/material/Grid";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Badge from "@mui/material/Badge";
import logo from "../../images/pro-shooters_lg_negative-round_web.svg";
//context
import { AppContext } from "../../context/AppContext";

const useStyles = makeStyles()((theme) => {
  return {
    navLink: {
      "& a": {
        cursor: "pointer",
        textDecoration: "none",
        height: "20px",
        display: "flex",
        color: theme.palette.text.secondary,
        alignItems: "center",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        "&: hover": {
          color: theme.palette.text.primary,
        },
      },
    },
    navLinkActive: {
      "& a": {
        cursor: "pointer",
        textDecoration: "none",
        height: "20px",
        display: "flex",
        color: theme.palette.primary.main,
        fontWeight: "bold",
        alignItems: "center",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        "&: hover": {
          color: theme.palette.text.primary,
        },
      },
    },
  };
});

//Link modification
const MyLinkLogo = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <Box component="a" onClick={onClick} ref={ref} href={href}>
      <Image
        src={logo}
        alt="Logo Pro Shooters"
        width={50}
        height={50}
        blurDataURL="data:..."
        placeholder="blur"
      />
    </Box>
  );
});

const MyLinkCart = React.forwardRef(({ onClick, href }, ref) => {
  const theme = useTheme();
  return (
    <Box component="a" onClick={onClick} ref={ref} href={href}>
      <LocalMallIcon fontSize="large" color="secondary" />
    </Box>
  );
});

const NavBar = () => {
  const [cart] = useContext(AppContext);
  const productsCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : null;
  const totalPrice =
    null !== cart && Object.keys(cart).length ? cart.totalProductsPrice : "";
  const { classes } = useStyles();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CATEGORIES_QUERY);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ gridAutoFlow: "row dense" }}
    >
      <Grid item xs={3} md={1}>
        <Link href="/" passHref>
          <MyLinkLogo />
        </Link>
      </Grid>

      <Grid item container xs={12} md={10} alignItems="center">
        <nav style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {loading
              ? "Loading"
              : data.productCategories.nodes.map((category: any) => {
                  const { id, name, slug } = category;
                  return (
                    <Box
                      key={id}
                      className={
                        router.asPath === `/${encodeURIComponent(slug)}`
                          ? classes.navLinkActive
                          : classes.navLink
                      }
                    >
                      <Link key={id} href={`/${encodeURIComponent(slug)}`}>
                        {name}
                      </Link>
                    </Box>
                  );
                })}
          </Box>
        </nav>
      </Grid>
      <Grid item xs={3} md={1}>
        <Badge
          color="primary"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={productsCount ? productsCount : null}
        >
          <Link href="/cart" passHref>
            <MyLinkCart />
          </Link>
        </Badge>
      </Grid>
    </Grid>
  );
};

export default NavBar;
