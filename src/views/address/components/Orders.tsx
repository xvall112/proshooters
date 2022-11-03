import React, { useContext } from "react";
import isUndefined from "lodash/isUndefined";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { AppContext } from "../../../context/AppContext";
import Skeleton from "@mui/material/Skeleton";
//types
import { CartContextType } from "../../../types/appContext";
const mock = [
  {
    title: "Adidas shoes",
    size: "41",
    price: "$69.90",
    code: "D5268X149",
    image: "https://assets.maccarianagency.com/backgrounds/img56.jpg",
  },
  {
    title: "Nike",
    size: "41",
    price: "$49.90",
    code: "P8763Y435",
    image: "https://assets.maccarianagency.com/backgrounds/img57.jpg",
  },
  {
    title: "Sneakers",
    size: "41",
    price: "$59.90",
    code: "A1356F865",
    image: "https://assets.maccarianagency.com/backgrounds/img58.jpg",
  },
];

const Orders = (): JSX.Element => {
  const { cart, originCart, loadingCart } = useContext(
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
                  /* i === cart.products.length - 1 ? "none" : */ "block",
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
        <Button
          component={Link}
          href={"/demos/ecommerce/order-complete"}
          variant={"contained"}
          size={"large"}
          fullWidth
        >
          Objednat
        </Button>
      </Stack>
    </Box>
  );
};

export default Orders;