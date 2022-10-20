import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Props {
  totalProductsPrice: any;
}
const SummeryBox: React.FC<Props> = ({ totalProductsPrice }): JSX.Element => {
  return (
    <Box>
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
      <Stack spacing={2} marginY={{ xs: 2, sm: 4 }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>Mezisoučet</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            {totalProductsPrice && (
              <div dangerouslySetInnerHTML={{ __html: totalProductsPrice }} />
            )}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>Sleva</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            -$0.00
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography color={"text.secondary"}>VAT (+20%)</Typography>
          <Typography color={"text.secondary"} fontWeight={700}>
            $35,94
          </Typography>
        </Box>
        <Divider />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant={"h6"} fontWeight={700}>
            Celekem (Vč. DPH)
          </Typography>
          <Typography variant={"h6"} fontWeight={700}>
            {totalProductsPrice && (
              <div dangerouslySetInnerHTML={{ __html: totalProductsPrice }} />
            )}
          </Typography>
        </Box>
        <Button
          component={Link}
          href={"/demos/ecommerce/checkout"}
          variant={"contained"}
          size={"large"}
          fullWidth
        >
          PŘEJÍT K POKLADNĚ
        </Button>
      </Stack>
    </Box>
  );
};

export default SummeryBox;
