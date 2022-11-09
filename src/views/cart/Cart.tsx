import React, { useContext, useEffect } from "react";
import Container from "../../components/Container";
import { AppContext } from "../../context/AppContext";
import { isEmpty } from "lodash";
//components
import EmptyCart from "./components/EmptyCart";
import Orders from "./components/Orders";
import SummeryBox from "./components/SummeryBox";
import CheckoutButton from "./components/checkoutButton";
//materialUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
//types
import { CartContextType } from "../../types/appContext";

const Cart = () => {
  const { cart, updateCartProcessing, setActiveStep } = useContext(
    AppContext
  ) as CartContextType;
  useEffect(() => {
    setActiveStep(0);
  }, []);
  return (
    <>
      <Backdrop
        sx={{
          color: (theme) => theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={updateCartProcessing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        {!isEmpty(cart) ? (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" fontWeight={700} marginBottom={4}>
                  Váš nákupní košík
                </Typography>
                {cart.products?.length &&
                  cart.products.map((item: any) => (
                    <Orders
                      key={item.productId}
                      item={item}
                      /* updateCartProcessing={updateCartProcessing} */
                      products={cart.products}
                      /*  handleRemoveProductClick={handleRemoveProductClick} */
                      /*  updateCart={updateCart} */
                    />
                  ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: "alternate.main",
                    padding: { xs: 2, sm: 4 },
                  }}
                >
                  <Typography variant="h6" fontWeight={700} marginBottom={4}>
                    Celkem
                  </Typography>
                  <SummeryBox />
                  <CheckoutButton />
                </Card>
                <Box marginTop={4}>
                  <Typography gutterBottom>Potřebujete poradit?</Typography>
                  <Stack direction={"row"} spacing={2}>
                    <Button
                      sx={{
                        color: "text.secondary",
                      }}
                      startIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      }
                    >
                      Telefon
                    </Button>
                    <Button
                      sx={{
                        color: "text.secondary",
                      }}
                      startIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      }
                    >
                      Email
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </>
  );
};

export default Cart;
