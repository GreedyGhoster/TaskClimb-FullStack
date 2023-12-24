import "./global.css";
import { AppRouter } from "./routes";
import { LinkProps } from "@mui/material/Link";
import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import LinkBehaviour from "./custom/theme";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            mobile: 0,
            tablet: 640,
            laptop: 1024,
            desktop: 1200,
          },
        },
        palette: {
          mode,
          secondary: {
            light: "#ffae42",
            main: "#ffae42",
            dark: "#ba000d",
            contrastText: "#000",
          },
        },
        components: {
          MuiLink: {
            defaultProps: {
              component: LinkBehaviour,
            } as LinkProps,
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: LinkBehaviour,
            },
          },
        },
      }),
    [mode]
  );

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
