import React from "react";
import Box from "@mui/material/Box";

interface Props {
  children: React.ReactNode;
  noPaddingY?: boolean;
  // All other props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const Container = ({ noPaddingY, children, ...rest }: Props): JSX.Element => (
  <Box
    maxWidth={{ sm: 720, md: 1436 }}
    width={1}
    margin={"0 auto"}
    paddingX={2}
    paddingY={noPaddingY ? { xs: 1, md: 0 } : { xs: 4, sm: 4, md: 4 }}
    {...rest}
  >
    {children}
  </Box>
);

export default Container;
