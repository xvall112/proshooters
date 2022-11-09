import React, { useContext, useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { AppContext } from "../../context/AppContext";
import { v4 } from "uuid";

//materialUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormHelperText from "@mui/material/FormHelperText";
//components
import Container from "../../components/Container";
import Orders from "./components/Orders";
//images
import ZasilkovnaLogo from "../../images/doprava/zasilkovna_cz.svg";
import DopravaNaAdresu from "../../images/doprava/dopravaNaAdresu.svg";
import PlatbaKartou from "../../images/doprava/platbaKartou.svg";
import GoPay from "../../images/doprava/gopay.svg";
import BankovnimPrevodem from "../../images/doprava/bankovnim-prevodem.svg";
import PersonalPickup from "../../images/doprava/personal-pickup.svg";
//formik
import { useFormik } from "formik";
import * as yup from "yup";

//GQL
import { useMutation, useQuery } from "@apollo/client";
import { GET_SHIPPING_METHODS } from "../../utils/gql/queries/get-shippingMethods";
import UPDATE_SHIPPING_METHOD from "../../utils/gql/mutations/update-shippingMethods";
import GET_CART from "../../utils/gql/queries/get-cart";

const Label = ({ title, subtitle, image, price }) => {
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
        <Image src={image} alt="zasilkovna logo" height={40} />
      </Grid>
      <Grid container item xs={6} direction="column">
        <Typography fontWeight={700}>{title}</Typography>
        <Typography color={"text.secondary"} fontSize={"12px"}>
          {subtitle}
        </Typography>
      </Grid>
      <Grid container item xs={3} justifyContent="flex-end">
        <Typography>{price}</Typography>
      </Grid>
    </Grid>
  );
};

const StyledFormControlLabel = styled((props) => (
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

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }
  return <StyledFormControlLabel checked={checked} {...props} />;
}

const validationSchema = yup.object({
  typeOfDelivery: yup
    .string("Vyberte způsob doručení")
    .required("Vyberte způsob doručení"),
  typeOfPayment: yup
    .string("Vyberte způsob platby")
    .required("Vyberte způsob platby"),
});

const Payment = () => {
  const [pointZasilkovna, setPointZasilkovna] = useState(null);
  const { setActiveStep, activeStep } = useContext(AppContext);

  // set active step on navbar
  useEffect(() => {
    setActiveStep(1);
  }, []);

  //gql
  const { data, loading, error } = useQuery(GET_SHIPPING_METHODS);

  const [updateShippingMethod, { loading: updateShippingMethodLoading }] =
    useMutation(UPDATE_SHIPPING_METHOD, {
      refetchQueries: [
        { query: GET_CART }, // DocumentNode object parsed with gql
        "GET_CART", // Query name
      ],
    });

  const formik = useFormik({
    initialValues: {
      typeOfDelivery: "",
      typeOfPayment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  //set option Zasilkovna
  const packetaApiKey = "XXX XXX XXX";

  const packetaOptions = {
    country: "cz",
    language: "cs",
    valueFormat: "carrierId,carrierPickupPointId,name,city,street",
  };

  function showSelectedPickupPoint(point) {
    // Add here an action on pickup point selection
    if (point) {
      setPointZasilkovna(point.formatedValue);
    }
  }

  const handleOpenZasilkovnaWidget = () => {
    Packeta.Widget.pick(packetaApiKey, showSelectedPickupPoint, packetaOptions);
  };

  const heandleShippingMethodChange = async (shippingMethods) => {
    await updateShippingMethod({
      variables: {
        input: {
          clientMutationId: v4(), // Generate a unique id.
          shippingMethods: shippingMethods,
        },
      },
    });
  };
  return (
    <>
      <Container>
        <Box>
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={7}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={700} marginBottom={4}>
                      Zvolte způsob dopravy
                    </Typography>
                    <FormControl fullWidth>
                      <RadioGroup
                        id="typeOfDelivery"
                        name="typeOfDelivery"
                        value={formik.values.typeOfDelivery}
                        /*   onChange={formik.handleChange} */
                        onChange={(e, value) =>
                          heandleShippingMethodChange(value)
                        }
                      >
                        {loading
                          ? "loading"
                          : data.shippingMethods.nodes.map((method) => {
                              return (
                                <MyFormControlLabel
                                  value={method.databaseId}
                                  label={
                                    <Label
                                      title={method.title}
                                      subtitle={method.description}
                                      price={"89 Kč"}
                                      image={ZasilkovnaLogo}
                                    />
                                  }
                                  control={<Radio />}
                                />
                              );
                            })}
                        {/*     <MyFormControlLabel
                          className="packeta-selector-open"
                          onClick={() => handleOpenZasilkovnaWidget()}
                          value="zasilkovna"
                          label={
                            <Label
                              title={"Zásilkovna"}
                              subtitle={`Doručení na výdejní místo ${
                                pointZasilkovna !== null ? pointZasilkovna : ""
                              }
                          `}
                              price={"89 Kč"}
                              image={ZasilkovnaLogo}
                            />
                          }
                          control={<Radio />}
                        />
                        <MyFormControlLabel
                          onClick={() => {
                            setPointZasilkovna(null);
                          }}
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
                        <MyFormControlLabel
                          onClick={() => {
                            setPointZasilkovna(null);
                          }}
                          value="personal"
                          label={
                            <Label
                              title={"Osobní odběr"}
                              subtitle={"Po telefonické domluvě"}
                              price={"0 Kč"}
                              image={PersonalPickup}
                            />
                          }
                          control={<Radio />}
                        /> */}
                      </RadioGroup>
                      <FormHelperText
                        error={
                          formik.touched.typeOfDelivery &&
                          Boolean(formik.errors.typeOfDelivery)
                        }
                      >
                        {formik.touched.typeOfDelivery &&
                          formik.errors.typeOfDelivery}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={700} marginBottom={4}>
                      Zvolte způsob platby
                    </Typography>

                    <FormControl
                      fullWidth
                      error={
                        formik.touched.typeOfPayment &&
                        Boolean(formik.errors.typeOfPayment)
                      }
                    >
                      <RadioGroup
                        name="typeOfPayment"
                        id="typeOfPayment"
                        value={formik.values.typeOfPayment}
                        onChange={formik.handleChange}
                        helperText={
                          formik.touched.typeOfPayment &&
                          formik.errors.typeOfPayment
                        }
                      >
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
                      <FormHelperText
                        filled
                        error={
                          formik.touched.typeOfPayment &&
                          Boolean(formik.errors.typeOfPayment)
                        }
                      >
                        {formik.touched.typeOfPayment &&
                          formik.errors.typeOfPayment}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </form>
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
      <Script src="https://widget.packeta.com/v6/www/js/library.js" />
    </>
  );
};

export default Payment;