import React from "react";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import miroslavZapletal from "../../../images/banner/miroslavZapletal.png";

const mock = [
  {
    caption: "Novinka",
    title: "Sportovní pružiny MrCZShooter",
    description:
      "Oficiálně nabízíme exkluzivní SET pružin pro sportovní pistole CZ Shadow 2, jednoho z nejlepších IPSC střelců na světě Miroslava Zapletala",
    image: miroslavZapletal,
    href: "/demos/ecommerce/product-overview",
  },
  {
    caption: "New in store",
    title: "Air Jordan 1 Mid Banned",
    description:
      "All orders will be shipped with DHL Express, including On Demand Delivery service.",
    image: miroslavZapletal,
    href: "/demos/ecommerce/product-overview",
  },

  {
    caption: "Timer",
    title: "Timer Shooters Global",
    description:
      "Prvotřídní timer polské firmy Shooters Global, který přináší revoluci do segmentu střeleckých timerů.",
    image: "https://assets.maccarianagency.com/backgrounds/img66.png",
    href: "/product/shooters-global-timer-sportovni-verze",
  },
];

const PromoGrid = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Grid container spacing={{ xs: 2, sm: 4 }}>
      <Grid item xs={12} md={5}>
        <Card
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            height: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: `linear-gradient(0deg, rgba(198,21,23,1) 32%, rgba(250,31,33,1) 100%)`,
          }}
        >
          <Box sx={{ p: 4, mb: 2 }}>
            <Image
              src={mock[0].image}
              alt={"Miroslav Zapletal"}
              width={400}
              objectFit="contain"
            />
          </Box>
          <Box>
            <Typography
              color={"text.primary"}
              fontWeight={700}
              variant={"caption"}
              sx={{ textTransform: "uppercase" }}
            >
              {mock[0].caption}
            </Typography>
            <Typography
              variant={"h5"}
              color={"common.white"}
              fontWeight={700}
              marginY={1}
            >
              {mock[0].title}
            </Typography>
            <Typography color={"common.white"}>
              {mock[0].description}
            </Typography>
            <Link
              href={mock[0].href}
              variant={"subtitle2"}
              color={"common.white"}
              fontWeight={700}
              underline={"hover"}
              sx={{
                textTransform: "uppercase",
                display: "block",
                mt: { xs: 2, sm: 4 },
              }}
            >
              VÍCE
            </Link>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={7}>
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          <Grid item xs={12}>
            <Card
              elevation={3}
              sx={{
                p: { xs: 2, sm: 4 },
                height: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row-reverse" },
                alignItems: "center",
              }}
            >
              <Box sx={{ p: 4, mb: 2 }}>
                <Image
                  src={mock[1].image}
                  alt={"Miroslav Zapletal"}
                  width={500}
                  objectFit="contain"
                />
              </Box>
              <Box>
                <Typography
                  color={"text.secondary"}
                  fontWeight={700}
                  variant={"caption"}
                  sx={{ textTransform: "uppercase" }}
                >
                  {mock[1].caption}
                </Typography>
                <Typography variant={"h5"} fontWeight={700} marginY={1}>
                  {mock[1].title}
                </Typography>
                <Typography color={"text.secondary"}>
                  {mock[1].description}
                </Typography>
                <Link
                  href={mock[1].href}
                  variant={"subtitle2"}
                  color={"primary"}
                  fontWeight={700}
                  underline={"hover"}
                  sx={{
                    textTransform: "uppercase",
                    display: "block",
                    mt: { xs: 2, sm: 4 },
                  }}
                >
                  Shop now
                </Link>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              elevation={3}
              sx={{
                p: { xs: 2, sm: 4 },
                height: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
              }}
            >
              <Box sx={{ p: 4, mb: 2 }}>
                <Box
                  height={200}
                  width={400}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box height={1} width={1} maxHeight={300}>
                    <Box
                      component={"iframe"}
                      title="video"
                      width="100%"
                      height="100%"
                      minHeight={120}
                      src={"https://www.youtube.com/embed/_c_QNrdiyhM&t=141s"}
                      frameBorder="0"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      boxShadow={4}
                      borderRadius={2}
                    />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography
                  color={"text.secondary"}
                  fontWeight={700}
                  variant={"caption"}
                  sx={{ textTransform: "uppercase" }}
                >
                  {mock[2].caption}
                </Typography>
                <Typography variant={"h5"} fontWeight={700} marginY={1}>
                  {mock[2].title}
                </Typography>
                <Typography color={"text.secondary"}>
                  {mock[2].description}
                </Typography>
                <Link
                  href={mock[2].href}
                  variant={"subtitle2"}
                  color={"primary"}
                  fontWeight={700}
                  underline={"hover"}
                  sx={{
                    textTransform: "uppercase",
                    display: "block",
                    mt: { xs: 2, sm: 4 },
                  }}
                >
                  KOUPIT
                </Link>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PromoGrid;
