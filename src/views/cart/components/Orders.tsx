import React, { useContext, useState } from "react";
import Image from "next/image";
import { debounce } from "lodash";
import { getUpdatedItems } from "../../../functions";
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
    updateCartProcessing,
    loadingCart,
    handleQtyChange,
  } = useContext(AppContext) as CartContextType;

  const [productCount, setProductCount] = useState(item.qty);

  const debouncedQtyUpdate = React.useRef(
    debounce(async (updatedItems) => {
      handleQtyChange(updatedItems);
    }, 500)
  ).current;

  const handleQtyChanges = async (event: any, cartKey: any, products: any) => {
    if (process.browser) {
      event.stopPropagation();
      // If the previous update cart mutation request is still processing, then return.
      if (updateCartProcessing) {
        return;
      }
      // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
      const newQty = event.target.value ? parseInt(event.target.value) : 1;
      // Set the new qty in state.
      setProductCount(newQty);

      if (products.length) {
        const updatedItems = getUpdatedItems(products, newQty, cartKey);
        debouncedQtyUpdate(updatedItems);
      }
    }
  };
  React.useEffect(() => {
    return () => {
      debouncedQtyUpdate.cancel();
    };
  }, [debouncedQtyUpdate]);
  return (
    <>
      <Box display={"flex"}>
        <Box
          mr={{ xs: 1, md: 2 }}
          sx={{
            borderRadius: 2,
            width: 1,
            height: 1,
            maxWidth: { xs: 120 },

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
          <Box sx={{ order: 1 }} width={{ xs: "200px", md: "300px" }}>
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
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 1 }}
                data-cart-key={item.cartKey}
                value={productCount}
                onChange={(event) =>
                  handleQtyChanges(event, item.cartKey, products)
                }
                /*  disabled={updateCartProcessing || loadingCart} */
                sx={{ width: "100px" }}
              />
            </FormControl>
            {/* <ButtonGroup
              size="small"
              variant="outlined"
              aria-label="outlined primary button group"
              disabled={updateCartProcessing || loadingCart}
            >
              <Button onClick={() => minusQty()}>-</Button>
              <Button onClick={() => plusQty()}>+</Button>
            </ButtonGroup> */}
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
              {loadingCart || updateCartProcessing ? (
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
