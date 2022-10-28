import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import GET_CATEGORIES_QUERY from "../../../../utils/gql/queries/get-categories";
//materialUI
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import Grid from "@mui/material/Grid";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import logo from "../../../../images/pro-shooters_lg_web.svg";
//context
import { AppContext } from "../../../../context/AppContext";
//types
import { CartContextType } from "../../../../types/appContext";
import theme from "../../../../theme";

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
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),

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
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),

        "&: hover": {
          color: theme.palette.text.primary,
        },
      },
    },
  };
});

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
  const theme = useTheme();
  return (
    <Box component="a" onClick={onClick} ref={ref} href={href}>
      <LocalMallIcon fontSize="large" color="secondary" />
    </Box>
  );
});

const NavBar = () => {
  const { cart } = useContext(AppContext) as CartContextType;
  const productsCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : null;

  const { classes } = useStyles();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CATEGORIES_QUERY);

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
        <Box
          component="nav"
          sx={{
            width: "100%",
            padding: "10px 0 10px 0px",
            [theme.breakpoints.down("md")]: {
              borderTop: `1px solid ${theme.palette.primary.main}`,
              borderBottom: `1px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              overflowX: "scroll",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": {
                display: "none",
              },
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
                        <a>{name}</a>
                      </Link>
                    </Box>
                  );
                })}
          </Box>
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
          <Link href="/cart" passHref>
            <MyLinkCart />
          </Link>
        </Badge>
      </Grid>
    </Grid>
  );
};

export default NavBar;
