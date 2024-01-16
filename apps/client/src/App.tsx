import { createContext } from "react";
import "./global.css";
import { AppRouter } from "./routes";
import { ThemeProvider } from "@mui/material";
import useChangeThemeMode from "./custom/theme/hooks/useChangeTheme";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App() {
  const { theme, colorMode } = useChangeThemeMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
