/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import miroslavZapletal from "../../../images/banner/miroslavZapletal.png";
const Overview = (): JSX.Element => {
  return (
    <Box bgcolor={"primary.main"} borderRadius={2}>
      <Link href={"/"} passHref>
        <a style={{ textDecoration: "none" }}>
          <Grid container justifyContent="space-around">
            <Grid
              item
              container
              alignItems="center"
              xs={12}
              md={4}
              sx={{
                marginY: 2,
                paddingX: 2,
              }}
            >
              <Box marginBottom={2}>
                <Typography
                  variant="h4"
                  color="text.primary"
                  align={"left"}
                  sx={{ fontWeight: 700, color: "common.white" }}
                >
                  Sportovní pružiny MrCZShooter
                </Typography>
                <Typography
                  align={"left"}
                  sx={{ color: "common.white", marginTop: 2 }}
                >
                  Díky dobrým vztahům as elitním českým IPSC střelcem Miroslavem
                  Zapletalem, máme možnost nabízet jeho exkluzivní SET pružin
                  pro sportovní pistole CZ Shadow 2. Stejně jako desítky střelců
                  u nás i v zahraničí i my využíváme SET pružin “MrCZShooter” a
                  jsme hrdí, že jménem jednoho z nejlepších střelců na světě,
                  můžeme tento set nabízet oficiálně i my.
                </Typography>
              </Box>
              {/*  <Button color="secondary" size="large" variant="contained">
            Vice
          </Button> */}
            </Grid>
            <Grid item container justifyContent="center" xs={12} md={6}>
              <Image
                src={miroslavZapletal}
                alt={"Miroslav Zapletal"}
                width={700}
                objectFit="contain"
              />
            </Grid>
          </Grid>
        </a>
      </Link>
    </Box>
  );
};

export default Overview;
