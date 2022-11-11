import React, { useContext } from "react";
import Link from "next/link";
import isUndefined from "lodash/isUndefined";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AppContext } from "../../../context/AppContext";
import Skeleton from "@mui/material/Skeleton";
//types
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

const Orders = (): JSX.Element => {
  const { cart, originCart, loadingCart, delivery } = useContext(
    AppContext
  ) as CartContextType;
  const theme = useTheme();

  return (
    <Box>
      {cart.products?.length &&
        cart.products.map((item, i) => (
          <Box key={i}>
            <Box display={"flex"}>
              <Image
                src={item.image?.sourceUrl}
                alt={item.image?.altText}
                height={100}
                width={100}
              />
              <Box
                display={"flex"}
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                width={1}
                ml={1}
              >
                <Box>
                  <Typography fontWeight={700} variant={"subtitle2"}>
                    {item.name}
                  </Typography>
                  {/*     <Typography color={'text.secondary'} variant={'subtitle2'}>
                  Size: {item.size}
                </Typography> */}
                  <Typography
                    color={"text.secondary"}
                    variant={"subtitle2"}
                    noWrap={true}
                  >
                    Code: {item.productId}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight={700} variant={"subtitle2"}>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.totalPrice }}
                    />
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider
              sx={{
                marginY: { xs: 2, sm: 4 },
                display:
                  /* i === cart?.products?.length - 1 ? "none" : */ "block",
              }}
            />
          </Box>
        ))}
      <Box
        component={"form"}
        noValidate
        autoComplete="off"
        sx={{
          marginY: 4,
          "& .MuiInputBase-input.MuiOutlinedInput-input": {
            bgcolor: "background.paper",
          },
        }}
      >
        <Box display="flex">
          <Box
            flex={"1 1 auto"}
            component={TextField}
            label="Slevový kod"
            variant="outlined"
            color="primary"
            fullWidth
            height={54}
            maxWidth={300}
          />
          <Box
            component={Button}
            variant="contained"
            color="primary"
            size="large"
            height={54}
            marginLeft={1}
            width={1}
            flex={1}
          >
            Uplatnit
          </Box>
        </Box>
      </Box>
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
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography color={"text.secondary"}>Doprava:</Typography>
            <Typography color={"text.secondary"} fontSize={"14px"}>
              {delivery?.title}
            </Typography>
          </Box>
          <Typography color={"text.secondary"} fontWeight={700}>
            {loadingCart ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", minWidth: "100px" }}
              />
            ) : (
              <>{delivery.price} Kč</>
            )}
          </Typography>
        </Box>
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
          <Typography color={"text.secondary"}>DPH </Typography>
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
              //TODO pricitat cenu k celkove castce
              <div dangerouslySetInnerHTML={{ __html: originCart.total }} />
            )}
          </Typography>
        </Box>
        {/*  <Link href="/checkout/address" passHref>
          <MyLinkButton />
        </Link> */}
      </Stack>
    </Box>
  );
};

export default Orders;
