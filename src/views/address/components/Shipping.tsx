import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
//materialUI
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import MuiPhoneNumber from "material-ui-phone-number-2";
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  /*   { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268",
  },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { code: "AW", label: "Aruba", phone: "297" },
  { code: "AX", label: "Alland Islands", phone: "358" },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "387",
  },
  { code: "BB", label: "Barbados", phone: "1-246" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BE", label: "Belgium", phone: "32" },
  { code: "BF", label: "Burkina Faso", phone: "226" },
  { code: "BG", label: "Bulgaria", phone: "359" },
  { code: "BH", label: "Bahrain", phone: "973" },
  { code: "BI", label: "Burundi", phone: "257" },
  { code: "BJ", label: "Benin", phone: "229" },
  { code: "BL", label: "Saint Barthelemy", phone: "590" },
  { code: "BM", label: "Bermuda", phone: "1-441" },
  { code: "BN", label: "Brunei Darussalam", phone: "673" },
  { code: "BO", label: "Bolivia", phone: "591" },
  { code: "BR", label: "Brazil", phone: "55" },
  { code: "BS", label: "Bahamas", phone: "1-242" },
  { code: "BT", label: "Bhutan", phone: "975" },
  { code: "BV", label: "Bouvet Island", phone: "47" },
  { code: "BW", label: "Botswana", phone: "267" },
  { code: "BY", label: "Belarus", phone: "375" },
  { code: "BZ", label: "Belize", phone: "501" },
  {
    code: "CA",
    label: "Canada",
    phone: "1",
    suggested: true,
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
    phone: "61",
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
    phone: "243",
  },
  {
    code: "CF",
    label: "Central African Republic",
    phone: "236",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
    phone: "242",
  },
  { code: "CH", label: "Switzerland", phone: "41" },
  { code: "CI", label: "Cote d'Ivoire", phone: "225" },
  { code: "CK", label: "Cook Islands", phone: "682" },
  { code: "CL", label: "Chile", phone: "56" },
  { code: "CM", label: "Cameroon", phone: "237" },
  { code: "CN", label: "China", phone: "86" },
  { code: "CO", label: "Colombia", phone: "57" },
  { code: "CR", label: "Costa Rica", phone: "506" },
  { code: "CU", label: "Cuba", phone: "53" },
  { code: "CV", label: "Cape Verde", phone: "238" },
  { code: "CW", label: "Curacao", phone: "599" },
  { code: "CX", label: "Christmas Island", phone: "61" },
  { code: "CY", label: "Cyprus", phone: "357" }, */
  { code: "CZ", label: "Czech Republic", phone: "+420" },
  /* {
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { code: "DJ", label: "Djibouti", phone: "253" },
  { code: "DK", label: "Denmark", phone: "45" },
  { code: "DM", label: "Dominica", phone: "1-767" },
  {
    code: "DO",
    label: "Dominican Republic",
    phone: "1-809",
  },
  { code: "DZ", label: "Algeria", phone: "213" },
  { code: "EC", label: "Ecuador", phone: "593" },
  { code: "EE", label: "Estonia", phone: "372" },
  { code: "EG", label: "Egypt", phone: "20" },
  { code: "EH", label: "Western Sahara", phone: "212" },
  { code: "ER", label: "Eritrea", phone: "291" },
  { code: "ES", label: "Spain", phone: "34" },
  { code: "ET", label: "Ethiopia", phone: "251" },
  { code: "FI", label: "Finland", phone: "358" },
  { code: "FJ", label: "Fiji", phone: "679" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
    phone: "500",
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
    phone: "691",
  },
  { code: "FO", label: "Faroe Islands", phone: "298" },
  {
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true,
  },
  { code: "GA", label: "Gabon", phone: "241" },
  { code: "GB", label: "United Kingdom", phone: "44" },
  { code: "GD", label: "Grenada", phone: "1-473" },
  { code: "GE", label: "Georgia", phone: "995" },
  { code: "GF", label: "French Guiana", phone: "594" },
  { code: "GG", label: "Guernsey", phone: "44" },
  { code: "GH", label: "Ghana", phone: "233" },
  { code: "GI", label: "Gibraltar", phone: "350" },
  { code: "GL", label: "Greenland", phone: "299" },
  { code: "GM", label: "Gambia", phone: "220" },
  { code: "GN", label: "Guinea", phone: "224" },
  { code: "GP", label: "Guadeloupe", phone: "590" },
  { code: "GQ", label: "Equatorial Guinea", phone: "240" },
  { code: "GR", label: "Greece", phone: "30" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { code: "GT", label: "Guatemala", phone: "502" },
  { code: "GU", label: "Guam", phone: "1-671" },
  { code: "GW", label: "Guinea-Bissau", phone: "245" },
  { code: "GY", label: "Guyana", phone: "592" },
  { code: "HK", label: "Hong Kong", phone: "852" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    phone: "672",
  },
  { code: "HN", label: "Honduras", phone: "504" },
  { code: "HR", label: "Croatia", phone: "385" },
  { code: "HT", label: "Haiti", phone: "509" },
  { code: "HU", label: "Hungary", phone: "36" },
  { code: "ID", label: "Indonesia", phone: "62" },
  { code: "IE", label: "Ireland", phone: "353" },
  { code: "IL", label: "Israel", phone: "972" },
  { code: "IM", label: "Isle of Man", phone: "44" },
  { code: "IN", label: "India", phone: "91" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    phone: "246",
  },
  { code: "IQ", label: "Iraq", phone: "964" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    phone: "98",
  },
  { code: "IS", label: "Iceland", phone: "354" },
  { code: "IT", label: "Italy", phone: "39" },
  { code: "JE", label: "Jersey", phone: "44" },
  { code: "JM", label: "Jamaica", phone: "1-876" },
  { code: "JO", label: "Jordan", phone: "962" },
  {
    code: "JP",
    label: "Japan",
    phone: "81",
    suggested: true,
  },
  { code: "KE", label: "Kenya", phone: "254" },
  { code: "KG", label: "Kyrgyzstan", phone: "996" },
  { code: "KH", label: "Cambodia", phone: "855" },
  { code: "KI", label: "Kiribati", phone: "686" },
  { code: "KM", label: "Comoros", phone: "269" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    phone: "1-869",
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    phone: "850",
  },
  { code: "KR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", label: "Kuwait", phone: "965" },
  { code: "KY", label: "Cayman Islands", phone: "1-345" },
  { code: "KZ", label: "Kazakhstan", phone: "7" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
    phone: "856",
  },
  { code: "LB", label: "Lebanon", phone: "961" },
  { code: "LC", label: "Saint Lucia", phone: "1-758" },
  { code: "LI", label: "Liechtenstein", phone: "423" },
  { code: "LK", label: "Sri Lanka", phone: "94" },
  { code: "LR", label: "Liberia", phone: "231" },
  { code: "LS", label: "Lesotho", phone: "266" },
  { code: "LT", label: "Lithuania", phone: "370" },
  { code: "LU", label: "Luxembourg", phone: "352" },
  { code: "LV", label: "Latvia", phone: "371" },
  { code: "LY", label: "Libya", phone: "218" },
  { code: "MA", label: "Morocco", phone: "212" },
  { code: "MC", label: "Monaco", phone: "377" },
  {
    code: "MD",
    label: "Moldova, Republic of",
    phone: "373",
  },
  { code: "ME", label: "Montenegro", phone: "382" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
    phone: "590",
  },
  { code: "MG", label: "Madagascar", phone: "261" },
  { code: "MH", label: "Marshall Islands", phone: "692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { code: "ML", label: "Mali", phone: "223" },
  { code: "MM", label: "Myanmar", phone: "95" },
  { code: "MN", label: "Mongolia", phone: "976" },
  { code: "MO", label: "Macao", phone: "853" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    phone: "1-670",
  },
  { code: "MQ", label: "Martinique", phone: "596" },
  { code: "MR", label: "Mauritania", phone: "222" },
  { code: "MS", label: "Montserrat", phone: "1-664" },
  { code: "MT", label: "Malta", phone: "356" },
  { code: "MU", label: "Mauritius", phone: "230" },
  { code: "MV", label: "Maldives", phone: "960" },
  { code: "MW", label: "Malawi", phone: "265" },
  { code: "MX", label: "Mexico", phone: "52" },
  { code: "MY", label: "Malaysia", phone: "60" },
  { code: "MZ", label: "Mozambique", phone: "258" },
  { code: "NA", label: "Namibia", phone: "264" },
  { code: "NC", label: "New Caledonia", phone: "687" },
  { code: "NE", label: "Niger", phone: "227" },
  { code: "NF", label: "Norfolk Island", phone: "672" },
  { code: "NG", label: "Nigeria", phone: "234" },
  { code: "NI", label: "Nicaragua", phone: "505" },
  { code: "NL", label: "Netherlands", phone: "31" },
  { code: "NO", label: "Norway", phone: "47" },
  { code: "NP", label: "Nepal", phone: "977" },
  { code: "NR", label: "Nauru", phone: "674" },
  { code: "NU", label: "Niue", phone: "683" },
  { code: "NZ", label: "New Zealand", phone: "64" },
  { code: "OM", label: "Oman", phone: "968" },
  { code: "PA", label: "Panama", phone: "507" },
  { code: "PE", label: "Peru", phone: "51" },
  { code: "PF", label: "French Polynesia", phone: "689" },
  { code: "PG", label: "Papua New Guinea", phone: "675" },
  { code: "PH", label: "Philippines", phone: "63" },
  { code: "PK", label: "Pakistan", phone: "92" },
  { code: "PL", label: "Poland", phone: "48" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    phone: "508",
  },
  { code: "PN", label: "Pitcairn", phone: "870" },
  { code: "PR", label: "Puerto Rico", phone: "1" },
  {
    code: "PS",
    label: "Palestine, State of",
    phone: "970",
  },
  { code: "PT", label: "Portugal", phone: "351" },
  { code: "PW", label: "Palau", phone: "680" },
  { code: "PY", label: "Paraguay", phone: "595" },
  { code: "QA", label: "Qatar", phone: "974" },
  { code: "RE", label: "Reunion", phone: "262" },
  { code: "RO", label: "Romania", phone: "40" },
  { code: "RS", label: "Serbia", phone: "381" },
  { code: "RU", label: "Russian Federation", phone: "7" },
  { code: "RW", label: "Rwanda", phone: "250" },
  { code: "SA", label: "Saudi Arabia", phone: "966" },
  { code: "SB", label: "Solomon Islands", phone: "677" },
  { code: "SC", label: "Seychelles", phone: "248" },
  { code: "SD", label: "Sudan", phone: "249" },
  { code: "SE", label: "Sweden", phone: "46" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "SH", label: "Saint Helena", phone: "290" },
  { code: "SI", label: "Slovenia", phone: "386" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
    phone: "47",
  },
  { code: "SK", label: "Slovakia", phone: "421" },
  { code: "SL", label: "Sierra Leone", phone: "232" },
  { code: "SM", label: "San Marino", phone: "378" },
  { code: "SN", label: "Senegal", phone: "221" },
  { code: "SO", label: "Somalia", phone: "252" },
  { code: "SR", label: "Suriname", phone: "597" },
  { code: "SS", label: "South Sudan", phone: "211" },
  {
    code: "ST",
    label: "Sao Tome and Principe",
    phone: "239",
  },
  { code: "SV", label: "El Salvador", phone: "503" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
    phone: "1-721",
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
    phone: "963",
  },
  { code: "SZ", label: "Swaziland", phone: "268" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { code: "TD", label: "Chad", phone: "235" },
  {
    code: "TF",
    label: "French Southern Territories",
    phone: "262",
  },
  { code: "TG", label: "Togo", phone: "228" },
  { code: "TH", label: "Thailand", phone: "66" },
  { code: "TJ", label: "Tajikistan", phone: "992" },
  { code: "TK", label: "Tokelau", phone: "690" },
  { code: "TL", label: "Timor-Leste", phone: "670" },
  { code: "TM", label: "Turkmenistan", phone: "993" },
  { code: "TN", label: "Tunisia", phone: "216" },
  { code: "TO", label: "Tonga", phone: "676" },
  { code: "TR", label: "Turkey", phone: "90" },
  {
    code: "TT",
    label: "Trinidad and Tobago",
    phone: "1-868",
  },
  { code: "TV", label: "Tuvalu", phone: "688" },
  {
    code: "TW",
    label: "Taiwan, Province of China",
    phone: "886",
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
    phone: "255",
  },
  { code: "UA", label: "Ukraine", phone: "380" },
  { code: "UG", label: "Uganda", phone: "256" },
  {
    code: "US",
    label: "United States",
    phone: "1",
    suggested: true,
  },
  { code: "UY", label: "Uruguay", phone: "598" },
  { code: "UZ", label: "Uzbekistan", phone: "998" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "379",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { code: "VE", label: "Venezuela", phone: "58" },
  {
    code: "VG",
    label: "British Virgin Islands",
    phone: "1-284",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
    phone: "1-340",
  },
  { code: "VN", label: "Vietnam", phone: "84" },
  { code: "VU", label: "Vanuatu", phone: "678" },
  { code: "WF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", label: "Samoa", phone: "685" },
  { code: "XK", label: "Kosovo", phone: "383" },
  { code: "YE", label: "Yemen", phone: "967" },
  { code: "YT", label: "Mayotte", phone: "262" },
  { code: "ZA", label: "South Africa", phone: "27" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" }, */
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const Shipping = (): JSX.Element => {
  const [checked, setChecked] = React.useState(false);

  //is delivery address is same like billing address
  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const validationSchema = yup.object({
    shippingAddress: yup.object({
      email: yup
        .string()
        .email("Vložte správný tvar emailu")
        .required("Povinný údaj"),
      fullName: yup.string().required("Povinný údaj"),
      address: yup.string().required("Povinný údaj"),
      city: yup.string().required("Povinný údaj"),
      postCode: yup.string().required("Povinný údaj"),
      state: yup.string().required("Povinný údaj"),
      tel: yup
        .string()
        /*   .matches(phoneRegExp, "Špatné číslo") */
        .min(9, "Špatné číslo")
        .required("Povinný údaj"),
    }),

    billingAddress:
      checked &&
      yup.object({
        fullName: yup.string().required("Povinný údaj"),
        address: yup.string().required("Povinný údaj"),
        city: yup.string().required("Povinný údaj"),
        postCode: yup.string().required("Povinný údaj"),
        state: yup.string().required("Povinný údaj"),
        tel: yup
          .string()
          /*  .matches(phoneRegExp, "Špatné číslo") */
          .min(9, "Špatné číslo")
          .required("Povinný údaj"),
      }),
  });

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        email: "",
        fullName: "",
        companyName: "",
        address: "",
        city: "",
        postCode: "",
        state: "CZ",
        tel: "",
      },
      billingAddress: {
        fullName: "",
        address: "",
        city: "",
        postCode: "",
        state: "CZ",
        tel: "",
        ico: "",
        dic: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(checked ? values : values.shippingAddress, null, 2));
    },
  });

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} marginBottom={4}>
        Doručovací údaje
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email *"
              variant="outlined"
              name={"shippingAddress.email"}
              fullWidth
              value={formik.values.shippingAddress.email}
              onChange={formik.handleChange}
              error={
                formik.touched.shippingAddress?.email &&
                Boolean(formik.errors.shippingAddress?.email)
              }
              helperText={
                formik.touched.shippingAddress?.email &&
                formik.errors.shippingAddress?.email
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type={"text"}
              label="Jméno a Příjmení *"
              variant="outlined"
              name={"shippingAddress.fullName"}
              fullWidth
              value={formik.values.shippingAddress?.fullName}
              onChange={formik.handleChange}
              error={
                formik.touched.shippingAddress?.fullName &&
                Boolean(formik.errors.shippingAddress?.fullName)
              }
              helperText={
                formik.touched.shippingAddress?.fullName &&
                formik.errors.shippingAddress?.fullName
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type={"text"}
              label="Název firmy"
              variant="outlined"
              name={"shippingAddress.companyName"}
              fullWidth
              value={formik.values.shippingAddress?.companyName}
              onChange={formik.handleChange}
              error={
                formik.touched.shippingAddress?.companyName &&
                Boolean(formik.errors.shippingAddress?.companyName)
              }
              helperText={
                formik.touched.shippingAddress?.companyName &&
                formik.errors.shippingAddress?.companyName
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Ulice a číslo popisné *"
              variant="outlined"
              name={"shippingAddress.address"}
              fullWidth
              value={formik.values.shippingAddress?.address}
              onChange={formik.handleChange}
              error={
                formik.touched.shippingAddress?.address &&
                Boolean(formik.errors.shippingAddress?.address)
              }
              helperText={
                formik.touched.shippingAddress?.address &&
                formik.errors.shippingAddress?.address
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type={"text"}
              label="Město *"
              variant="outlined"
              name={"shippingAddress.city"}
              fullWidth
              value={formik.values.shippingAddress?.city}
              onChange={formik.handleChange}
              error={
                formik.touched.shippingAddress?.city &&
                Boolean(formik.errors.shippingAddress?.city)
              }
              helperText={
                formik.touched.shippingAddress?.city &&
                formik.errors.shippingAddress?.city
              }
            />
          </Grid>
          <Grid item xs={12}>
            {/*  <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight={700}
            >
              PSČ
            </Typography> */}
            <TextField
              type="text"
              label="PSČ *"
              variant="outlined"
              name={"shippingAddress.postCode"}
              fullWidth
              value={formik.values.shippingAddress?.postCode}
              onChange={formik.handleChange}
              error={
                formik.touched.shippingAddress?.postCode &&
                Boolean(formik.errors.shippingAddress?.postCode)
              }
              helperText={
                formik.touched.shippingAddress?.postCode &&
                formik.errors.shippingAddress?.postCode
              }
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Autocomplete
              onChange={(e, value) =>
                formik.setFieldValue("shippingAddress.state", value?.code || "")
              }
              id={"state"}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  value={formik.values.shippingAddress?.state}
                  error={
                    formik.touched.shippingAddress?.state &&
                    Boolean(formik.errors.shippingAddress?.state)
                  }
                  helperText={
                    formik.touched.shippingAddress?.state &&
                    formik.errors.shippingAddress?.state
                  }
                  {...params}
                  name={"shippingAddress.state"}
                  label="Vyberte stát"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <MuiPhoneNumber
              regions={["europe"]}
              defaultCountry={"cz"}
              type={"tel"}
              label="Telefon  *"
              variant="outlined"
              name={"shippingAddress.tel"}
              fullWidth
              value={formik.values.shippingAddress?.tel}
              onChange={(value: string) =>
                formik.setFieldValue("shippingAddress.tel", value || "")
              }
              error={
                formik.touched.shippingAddress?.tel &&
                Boolean(formik.errors.shippingAddress?.tel)
              }
              helperText={
                formik.touched.shippingAddress?.tel &&
                formik.errors.shippingAddress?.tel
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Box mb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChangeChecked}
                    defaultChecked={false}
                    color="primary"
                  />
                }
                label="Chci doplnit fakturační údaje"
              />
            </Box>
          </Grid>
        </Grid>

        {/*  if checked show up billing form */}
        {checked && (
          <>
            <Typography variant="h6" fontWeight={700} marginBottom={4}>
              Fakturační údaje
            </Typography>
            <Grid container spacing={{ xs: 2, md: 4 }}>
              <Grid item xs={12} sm={12}>
                <TextField
                  type={"text"}
                  label="Jméno a Příjmení (Název firmy) *"
                  variant="outlined"
                  name={"billingAddress.fullName"}
                  fullWidth
                  value={formik.values.billingAddress?.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.billingAddress?.fullName &&
                    Boolean(formik.errors.billingAddress?.fullName)
                  }
                  helperText={
                    formik.touched.billingAddress?.fullName &&
                    formik.errors.billingAddress?.fullName
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Ulice a číslo popisné *"
                  variant="outlined"
                  name={"billingAddress.address"}
                  fullWidth
                  value={formik.values.billingAddress?.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.billingAddress?.address &&
                    Boolean(formik.errors.billingAddress?.address)
                  }
                  helperText={
                    formik.touched.billingAddress?.address &&
                    formik.errors.billingAddress?.address
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type={"text"}
                  label="Město *"
                  variant="outlined"
                  name={"billingAddress.city"}
                  fullWidth
                  value={formik.values.billingAddress?.city}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.billingAddress?.city &&
                    Boolean(formik.errors.billingAddress?.city)
                  }
                  helperText={
                    formik.touched.billingAddress?.city &&
                    formik.errors.billingAddress?.city
                  }
                />
              </Grid>
              <Grid item xs={12}>
                {/*  <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight={700}
            >
              PSČ
            </Typography> */}
                <TextField
                  type="text"
                  label="PSČ *"
                  variant="outlined"
                  name={"billingAddress.postCode"}
                  fullWidth
                  value={formik.values.billingAddress?.postCode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.billingAddress?.postCode &&
                    Boolean(formik.errors.billingAddress?.postCode)
                  }
                  helperText={
                    formik.touched.billingAddress?.postCode &&
                    formik.errors.billingAddress?.postCode
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  onChange={(e, value) =>
                    formik.setFieldValue(
                      "billingAddress.state",
                      value?.code || ""
                    )
                  }
                  id={"state"}
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label} ({option.code})
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      value={formik.values.billingAddress?.state}
                      error={
                        formik.touched.billingAddress?.state &&
                        Boolean(formik.errors.billingAddress?.state)
                      }
                      helperText={
                        formik.touched.billingAddress?.state &&
                        formik.errors.billingAddress?.state
                      }
                      {...params}
                      name={"billingAddress.state"}
                      label="Vyberte stát"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <MuiPhoneNumber
                  onChange={(value: string) =>
                    formik.setFieldValue("billingAddress.tel", value || "")
                  }
                  regions={["europe"]}
                  defaultCountry={"cz"}
                  type={"tel"}
                  label="Telefon *"
                  variant="outlined"
                  name={"billingAddress.tel"}
                  fullWidth
                  value={formik.values.billingAddress?.tel}
                  error={
                    formik.touched.billingAddress?.tel &&
                    Boolean(formik.errors.billingAddress?.tel)
                  }
                  helperText={
                    formik.touched.billingAddress?.tel &&
                    formik.errors.billingAddress?.tel
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type={"text"}
                  label="ICO"
                  variant="outlined"
                  name={"billingAddress.ico"}
                  fullWidth
                  value={formik.values.billingAddress?.ico}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.billingAddress?.ico &&
                    Boolean(formik.errors.billingAddress?.ico)
                  }
                  helperText={
                    formik.touched.billingAddress?.ico &&
                    formik.errors.billingAddress?.ico
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type={"text"}
                  label="DIC"
                  variant="outlined"
                  name={"billingAddress.dic"}
                  fullWidth
                  value={formik.values.billingAddress?.dic}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.billingAddress?.dic &&
                    Boolean(formik.errors.billingAddress?.dic)
                  }
                  helperText={
                    formik.touched.billingAddress?.dic &&
                    formik.errors.billingAddress?.dic
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid container item xs={12} justifyContent={"space-between"}>
                <Grid item xs={12} md={4}>
                  <Button color="primary" variant="outlined" fullWidth>
                    ZPET
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    POKRAČOVAT
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </form>
    </Box>
  );
};

export default Shipping;
