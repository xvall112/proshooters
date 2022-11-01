import React, { useContext } from "react";
import isUndefined from "lodash/isUndefined";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
//context
import { AppContext } from "../../../context/AppContext";
import { CartContextType } from "../../../types/appContext";

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
          <Typography color={"text.secondary"}>DPH (+20%)</Typography>
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
          href={"/"}
          variant={"contained"}
          size={"large"}
          fullWidth
        >
          PŘEJÍT K POKLADNĚ
        </Button>
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
