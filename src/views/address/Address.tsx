import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { CartContextType } from "../../types/appContext";
//materialUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
//components
import Container from "../../components/Container";
import Orders from "./components/Orders";
import Shipping from "./components/Shipping";

const Address = () => {
  const { setActiveStep, orderLoading } = useContext(
    AppContext
  ) as CartContextType;

  useEffect(() => {
    setActiveStep(2);
  }, []);

  return (
    <>
      <Backdrop
        sx={{
          color: (theme) => theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={orderLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        <Box>
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={7}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Shipping />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="h6" fontWeight={700} marginBottom={4}>
                Přehled objednávky
              </Typography>
              <Card
                variant={"outlined"}
                sx={{
                  padding: { xs: 2, sm: 4 },
                }}
              >
                <Orders />
                <Box
                  sx={{
                    marginRight: { xs: -2, sm: -4 },
                    marginLeft: { xs: -2, sm: -4 },
                    marginBottom: { xs: -2, sm: -4 },
                    padding: { xs: 2, sm: 4 },
                    bgcolor: "alternate.main",
                  }}
                >
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
                      Contact sales
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
                      Email us
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Address;
