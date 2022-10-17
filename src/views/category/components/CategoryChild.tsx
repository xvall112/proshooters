import React from "react";
import Link from "next/link";
//materialUi
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
//components
import Image from "../../../components/Image";
import { DEFAULT_CATEGORY_IMG_URL } from "../../../constants/urls";

const MyPaper = React.forwardRef(({ onClick, href, name, image }, ref) => {
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
        sourceUrl={image?.sourceUrl ?? ""}
        defaultImgUrl={DEFAULT_CATEGORY_IMG_URL}
        altText={image?.altText ?? "picture"}
      />

      <Box ml={2}>{name}</Box>
    </Paper>
  );
});

interface Props {
  catChildren: any;
}

const CategoryChild = ({ catChildren }: Props) => {
  return (
    <>
      <Link href={`${encodeURIComponent(catChildren.slug)}`} passHref>
        <MyPaper name={catChildren.name} image={catChildren.image} />
      </Link>
    </>
  );
};

export default CategoryChild;
