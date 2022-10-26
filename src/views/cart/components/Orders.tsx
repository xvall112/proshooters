import React, { useContext, useState } from "react";
import Image from "next/image";
import { debounce } from "lodash";
//MaterialUI
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Skeleton from "@mui/material/Skeleton";

//context
import { AppContext } from "../../../context/AppContext";
//types
import { CartContextType } from "../../../types/appContext";
const Orders = ({ item, products }: any) => {
  const theme = useTheme();
  const {
    handleRemoveProductClick,
    handleQtyChange,
    updateCartProcessing,
    loadingCart,
  } = useContext(AppContext) as CartContextType;
  const [productCount, setProductCount] = useState(item.qty);

  //500ms debounce po zmene mnozstvi
  const debouncedQtyChange = React.useRef(
    debounce((count) => {
      handleQtyChange(count, item.cartKey, products);
    }, 500)
  ).current;

  //tlacitko + pridani mnostvi
  const plusQty = () => {
    setProductCount((productCount: any) => parseInt(productCount) + 1);
    debouncedQtyChange(parseInt(productCount) + 1);
  };
  //tlacitko - pridani mnostvi
  const minusQty = () => {
    setProductCount((productCount: any) => parseInt(productCount) - 1);
    debouncedQtyChange(parseInt(productCount) - 1);
  };
  //zmena mnozstvi v textovem poli
  const changeQty = (event: any) => {
    setProductCount(event.target.value);
    debouncedQtyChange(event.target.value);
  };

  React.useEffect(() => {
    return () => {
      debouncedQtyChange.cancel();
    };
  }, [debouncedQtyChange]);

  return (
    <>
      <Box display={"flex"}>
        <Box
          sx={{
            borderRadius: 2,
            width: 1,
            height: 1,
            maxWidth: { xs: 120 },
            marginRight: 2,
            filter: theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
          }}
        >
          <Image
            src={item.image?.sourceUrl}
            alt={item.image?.altText}
            height={100}
            width={100}
          />
        </Box>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          width={{ xs: 1, md: 800 }}
        >
          <Box sx={{ order: 1, width: "300px" }}>
            <Typography fontWeight={700} gutterBottom>
              {item.name}
            </Typography>
            {/*  <Typography
                  color={'text.secondary'}
                  variant={'subtitle2'}
                  gutterBottom
                >
                  Size:{' '}
                  <Typography
                    variant={'inherit'}
                    component={'span'}
                    color={'inherit'}
                    fontWeight={700}
                  >
                    {item.size}
                  </Typography>
                </Typography> */}
            {/*  <Typography
                  color={'text.secondary'}
                  variant={'subtitle2'}
                  gutterBottom
                >
                  Gender:{' '}
                  <Typography
                    variant={'inherit'}
                    component={'span'}
                    color={'inherit'}
                    fontWeight={700}
                  >
                    {item.gender}
                  </Typography>
                </Typography> */}
            <Typography
              color={"text.secondary"}
              variant={"subtitle2"}
              noWrap={true}
              gutterBottom
            >
              Code:{" "}
              <Typography
                variant={"inherit"}
                component={"span"}
                color={"inherit"}
                fontWeight={700}
              >
                {item.productId}
              </Typography>
            </Typography>
          </Box>

          <Stack
            direction={"row"}
            alignItems={"center"}
            marginTop={{ xs: 2, sm: 0 }}
            sx={{ order: { xs: 2, sm: 3 } }}
          >
            <FormControl>
              <TextField
                type={"number"}
                id="outlined-number"
                label="Množství"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                data-cart-key={item.cartKey}
                value={productCount}
                onChange={(event) => changeQty(event)}
                disabled={updateCartProcessing || loadingCart}
                sx={{ width: "100px" }}
              />
            </FormControl>
            <ButtonGroup
              size="small"
              variant="outlined"
              aria-label="outlined primary button group"
              disabled={updateCartProcessing || loadingCart}
            >
              <Button onClick={() => minusQty()}>-</Button>
              <Button onClick={() => plusQty()}>+</Button>
            </ButtonGroup>
            {/* <FormControl>
              <TextField
                id="outlined-number"
                label="Množství"
                type="number"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                data-cart-key={item.cartKey}
                value={productCount}
                onChange={(event) => changeQty(event, item.cartKey, products)}
                disabled={updateCartProcessing || loadingCart}
                sx={{ width: "100px" }}
              />
            </FormControl> */}

            <Typography
              fontWeight={700}
              marginLeft={2}
              sx={{ minWidth: "100px" }}
            >
              {updateCartProcessing || loadingCart ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.2rem", minWidth: "100px" }}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: item.totalPrice }} />
              )}
            </Typography>
          </Stack>
        </Box>
        <Stack
          spacing={1}
          direction={{ xs: "row", sm: "column" }}
          marginTop={{ xs: 2, sm: 0 }}
          sx={{ order: { xs: 3, sm: 2 } }}
        >
          <IconButton
            aria-label="delete"
            onClick={(event) =>
              handleRemoveProductClick(event, item.cartKey, products)
            }
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Box>

      <Divider
        sx={{
          marginY: { xs: 2, sm: 4 },
          /* display: i === mock.length - 1 ? 'none' : 'block', */
        }}
      />
    </>
  );
};

export default Orders;
