import { LinkProps } from "@mui/material/Link";
import createTheme from "@mui/material/styles/createTheme";
import { useMemo, useState } from "react";
import LinkBehaviour from "../../custom/theme";

export default function useChangeThemeMode() {
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

  return { theme, colorMode };
}
