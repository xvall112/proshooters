import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { AppContext } from "../../context/AppContext";
import { CartContextType } from "../../types/appContext";
//materialUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
//components
import Container from "../../components/Container";
import Orders from "./components/Orders";
//images
import ZasilkovnaLogo from "../../images/doprava/zasilkovna_cz.svg";
import DopravaNaAdresu from "../../images/doprava/dopravaNaAdresu.svg";
import PlatbaKartou from "../../images/doprava/platbaKartou.svg";
import GoPay from "../../images/doprava/gopay.svg";
import BankovnimPrevodem from "../../images/doprava/bankovnim-prevodem.svg";

const Label = ({ title, subtitle, image, price }: any) => {
  return (
    <Grid
      item
      xs={12}
      container
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Image src={image} alt="zasilkovna logo" />
      </Grid>
      <Grid container item xs={6} direction="column">
        <Typography fontWeight={700}>{title}</Typography>
        <Typography color={"text.secondary"} fontSize={"12px"}>
          {subtitle}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{price}</Typography>
      </Grid>
    </Grid>
  );
};

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": {
    border: "1px solid grey",
    width: "100%",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    "&": checked && {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const Address = () => {
  const { setActiveStep, activeStep } = useContext(
    AppContext
  ) as CartContextType;

  useEffect(() => {
    setActiveStep(1);
  }, []);

  return (
    <Container>
      <Box>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={700} marginBottom={4}>
                  Zvolte způsob dopravy
                </Typography>
                <RadioGroup name="delivery-radio-group">
                  <MyFormControlLabel
                    value="zasilkovna"
                    label={
                      <Label
                        title={"Zásilkovna"}
                        subtitle={"Doručení na výdejní místo"}
                        price={"89 Kč"}
                        image={ZasilkovnaLogo}
                      />
                    }
                    control={<Radio />}
                  />
                  <MyFormControlLabel
                    value="address"
                    label={
                      <Label
                        title={"Dodání na adresu"}
                        subtitle={"Doručení objednávky na vaší adresu"}
                        price={"89 Kč"}
                        image={DopravaNaAdresu}
                      />
                    }
                    control={<Radio />}
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={700} marginBottom={4}>
                  Zvolte způsob platby
                </Typography>
                <RadioGroup name="payment-radio-group">
                  <MyFormControlLabel
                    value="onlineBanknAccount"
                    label={
                      <Label
                        title={"Okamžitý bankovní převod"}
                        subtitle={
                          "Po potvrzení objednávky budete přesměrováni na stránku GoPay"
                        }
                        price={"Zdarma"}
                        image={GoPay}
                      />
                    }
                    control={<Radio />}
                  />
                  <MyFormControlLabel
                    value="bankAccount"
                    label={
                      <Label
                        title={"Klasický bankovní převod"}
                        subtitle={
                          "Po vytvoření objednávky vám zašleme instrukce, jak peníze převést bankovním převodem na náš účet."
                        }
                        price={"Zdarma"}
                        image={BankovnimPrevodem}
                      />
                    }
                    control={<Radio />}
                  />
                  <MyFormControlLabel
                    value="card"
                    label={
                      <Label
                        title={"Předem platební kartou"}
                        subtitle={"Online platba CZK"}
                        price={"Zdarma"}
                        image={PlatbaKartou}
                      />
                    }
                    control={<Radio />}
                  />
                </RadioGroup>
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
  );
};

export default Address;
