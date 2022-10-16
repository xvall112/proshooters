import React from "react";
import Link from "next/link";
//materialUi
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const MyPaper = React.forwardRef(({ onClick, href, name }, ref) => {
  const theme = useTheme();
  return (
    <Paper
      component="a"
      onClick={onClick}
      ref={ref}
      href={href}
      size={"large"}
      sx={{
        display: "block",
        color: "white",
        padding: "20px",
        textDecoration: "none",
        backgroundColor: theme.palette.primary.main,
      }}
      fullWidth
    >
      {name}
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
        <MyPaper name={catChildren.name} />
      </Link>
    </>
  );
};

export default CategoryChild;
