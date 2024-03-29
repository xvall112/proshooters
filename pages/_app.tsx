import * as React from "react";
import Head from "next/head";
import { AppProvider } from "../src/context/AppContext";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme/index";
import createEmotionCache from "../src/createEmotionCache";
import "keen-slider/keen-slider.min.css";
import Page from "../src/components/Page";
import Router from "next/router";
import NProgress from "nprogress";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

/* NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done()); */

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <Page>
        <Component {...pageProps} />
      </Page>
    </CacheProvider>
  );
}
