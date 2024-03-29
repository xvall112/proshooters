import React, { useContext } from "react";
import Link from "next/link";
import isUndefined from "lodash/isUndefined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
//context
import { AppContext } from "../../../context/AppContext";
import { CartContextType } from "../../../types/appContext";

const MyLinkButton = React.forwardRef(({ onClick, href }: any, ref) => {
  return (
    <Box
      component="a"
      onClick={onClick}
      ref={ref}
      href={href}
      sx={{ textDecoration: "none" }}
    >
      <Button variant={"contained"} size={"large"} fullWidth>
        POKRAČOVAT V OBJEDNÁVCE
      </Button>
    </Box>
  );
});

const MyLinkButtonZpet = React.forwardRef(({ onClick, href }: any, ref) => {
  return (
    <Box
      component="a"
      onClick={onClick}
      ref={ref}
      href={href}
      sx={{ textDecoration: "none" }}
    >
      <Button variant={"outlined"} size={"large"} fullWidth>
        Zpět do obchodu
      </Button>
    </Box>
  );
});

const SummeryBox: React.FC = (): JSX.Element => {
  const { originCart, loadingCart } = useContext(AppContext) as CartContextType;

  return (
    <Box>
      <Stack spacing={2} marginY={{ xs: 2, sm: 4 }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>Mezisoučet</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            {loadingCart ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", minWidth: "100px" }}
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: !isUndefined(originCart) ? originCart.subtotal : "",
                }}
              />
            )}
          </Typography>
        </Box>
        {/*  <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>Poštovné</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            {loadingCart ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", minWidth: "100px" }}
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: originCart.shippingTotal }}
              />
            )}
          </Typography>
        </Box> */}
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>Sleva</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            {loadingCart ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", minWidth: "100px" }}
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: originCart.discountTotal }}
              />
            )}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>DPH (+19%)</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            {loadingCart ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", minWidth: "100px" }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: originCart.totalTax }} />
            )}
          </Typography>
        </Box>
        <Divider />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant={"h6"} fontWeight={700}>
            Celekem (Vč. DPH)
          </Typography>
          <Typography variant={"h6"} fontWeight={700}>
            {loadingCart ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", minWidth: "100px" }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: originCart.total }} />
            )}
          </Typography>
        </Box>
        <Link href="/checkout/payment" passHref>
          <MyLinkButton />
        </Link>
        <Link href="/" passHref>
          <MyLinkButtonZpet />
        </Link>
      </Stack>
      <Box
        component={"form"}
        noValidate
        autoComplete="off"
        sx={{
          marginT: 4,
          "& .MuiInputBase-input.MuiOutlinedInput-input": {
            bgcolor: "background.paper",
          },
        }}
      >
        <Box>
          <Box
            flex={"1 1 auto"}
            component={TextField}
            label="Vložte slevový kód"
            variant="outlined"
            color="primary"
            fullWidth
            height={54}
          />
          <Box
            component={Button}
            color="primary"
            size="large"
            height={54}
            marginTop={1}
            fullWidth
            sx={{
              bgcolor: "divider",
              color: "text.primary",
            }}
          >
            uplatnit
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SummeryBox;
