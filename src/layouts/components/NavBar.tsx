import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import GET_CATEGORIES_QUERY from "../../utils/gql/queries/get-categories";
import Box from "@mui/material/Box";
import { makeStyles } from "tss-react/mui";
import styled from "@emotion/styled";

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

const NavBar: React.FC = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CATEGORIES_QUERY);

  if (loading) {
    return <h5>Loading</h5>;
  }
  return (
    <nav>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <Box className={classes.navLink}>
          <Link key="All" href="/" passHref>
            Home
          </Link>
        </Box>
        {data.productCategories.nodes.map((category: any) => {
          const { id, name, slug } = category;

          return (
            <Box
              key={id}
              className={
                router.asPath === `/category/${encodeURIComponent(slug)}`
                  ? classes.navLinkActive
                  : classes.navLink
              }
            >
              <Link key={id} href={`/category/${encodeURIComponent(slug)}`}>
                {name}
              </Link>
            </Box>
          );
        })}
      </Box>
    </nav>
  );
};

export default NavBar;
