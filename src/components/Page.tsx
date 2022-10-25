import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "../theme";
import theme from "../theme/index";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { AppProvider } from "../context/AppContext";
import createEmotionCache from "../createEmotionCache";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/ApolloClient";
import { AppProps } from "next/app";

/* export const useDarkMode = (): [string, () => void, boolean] => {
  const [themeMode, setTheme] = useState("light");
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode: string) => {
    try {
      window.localStorage.setItem("themeMode", mode);
    } catch {
      
    }

    setTheme(mode);
  };

  const themeToggler = (): void => {
    themeMode === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem("themeMode");
      localTheme ? setTheme(localTheme) : setMode("light");
    } catch {
      setMode("light");
    }

    setMountedComponent(true);
  }, []);

  return [themeMode, themeToggler, mountedComponent];
};
*/
interface Props {
  children: React.ReactNode;
}
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {}
export default function Page({ children }: Props): JSX.Element {
  /*  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const [themeMode, themeToggler, mountedComponent] = useDarkMode();

  useEffect(() => {}, [mountedComponent, themeMode]); */
  const emotionCache = clientSideEmotionCache;
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Paper elevation={0}>{children}</Paper>
          </ThemeProvider>
        </CacheProvider>
      </AppProvider>
    </ApolloProvider>
  );
}
