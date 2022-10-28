import React from "react";
import Link from "next/link";
//materialUi
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
//components
import Image from "next/image";
import { DEFAULT_CATEGORY_IMG_URL } from "../../../constants/urls";

interface Props {
  name: string;
  image: any;
  href: any;
  onClick: any;
}
/* const MyPaper = React.forwardRef(
  ({ onClick, href, name, image }: Props, ref: any) => {
    const theme = useTheme();
    return (
      <Paper
        component="a"
        onClick={onClick}
        ref={ref}
        href={href}
        size={"large"}
        sx={{
          display: "flex",
          direction: "row",
          alignItems: "center",
          color: "white",
          padding: "10px",
          textDecoration: "none",
          background: `linear-gradient(90deg, rgba(198,21,23,1) 32%, rgba(250,31,33,1) 100%)`,
          "&: hover": {
            background: theme.palette.primary.dark,
          },
        }}
        fullWidth
      >
        <Image
          height={50}
          width={50}
          sourceUrl={image?.sourceUrl ?? DEFAULT_CATEGORY_IMG_URL}
          defaultImgUrl={DEFAULT_CATEGORY_IMG_URL}
          altText={image?.altText ?? "picture"}
        />

        <Box ml={2}>{name}</Box>
      </Paper>
    );
  }
); */

interface IProps {
  catChildren: {
    name: string;
    image: any;
    slug: string;
  };
}

const CategoryChild = ({ catChildren }: IProps) => {
  const { name, image, slug } = catChildren;
  const theme = useTheme();
  return (
    <>
      <Link href={`${encodeURIComponent(slug)}`} passHref>
        <Paper
          elevation={3}
          component="a"
          sx={{
            display: "flex",
            direction: "row",
            alignItems: "center",
            color: theme.palette.text.primary,
            padding: "10px",
            textDecoration: "none",
            transition: "all .2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
            },
            /*  "&: hover": {
              background: theme.palette.secondary.main,
              color: "white",
            }, */
          }}
        >
          <Image
            height={50}
            width={50}
            src={image?.sourceUrl ?? DEFAULT_CATEGORY_IMG_URL}
            alt={image?.altText ?? "picture"}
          />

          <Box ml={2}>{name}</Box>
        </Paper>
      </Link>
    </>
  );
};

export default CategoryChild;
