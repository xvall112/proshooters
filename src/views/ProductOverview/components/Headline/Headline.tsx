import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MUILink from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Props {
  productCategories: any /* {
    id: string;
    name: string;
    slug: string;
    parent: {
      node: {
        slug: string;
        name: string;
        id: string;
      };
    };
  }; */;
}

const Headline = ({ productCategories }: Props): JSX.Element => {
  const { id, name, slug, parent } = productCategories;
  const router = useRouter();
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent={"space-between"}
      alignItems={{ xs: "flex-start", sm: "center" }}
    >
      <Box marginBottom={{ xs: 1, sm: 0 }}>
        <IconButton
          aria-label="back"
          color="secondary"
          onClick={() => router.back()}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">
          <MUILink underline="hover" color="primary">
            Home
          </MUILink>
        </Link>
        {productCategories &&
          productCategories.map((productCategory: any) => {
            const { id, name, slug, parent } = productCategory;
            return (
              <Breadcrumbs aria-label="breadcrumb">
                {parent && parent.node && (
                  <Link href={`/${encodeURIComponent(parent.node.slug)}`}>
                    <MUILink underline="hover" color="primary">
                      {parent.node.name}
                    </MUILink>
                  </Link>
                )}
                <Link href={`/${encodeURIComponent(slug)}`}>
                  <MUILink underline="hover" color="primary">
                    {name}
                  </MUILink>
                </Link>
              </Breadcrumbs>
            );
          })}

        <Typography color="text.primary">Detail produktu</Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default Headline;
