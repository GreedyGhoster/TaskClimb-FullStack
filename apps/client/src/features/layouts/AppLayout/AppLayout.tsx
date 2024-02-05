import { Outlet } from "react-router-dom";
import { UseTodoProvider } from "../../../hooks";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../../App";
import {
  AppBar,
  DrawerHeader,
  DrawerAnimation,
} from "../../../components/styled/AppLayout";
import { APP_SIDEBAR_WIDTH, AppSidebar } from "../AppSidebar";
import { AppNavbar } from "../AppNavbar";

export function AppLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const colorMode = useContext(ColorModeContext);

  const handlers = {
    handleDrawerOpen: () => {
      setOpen(true);
    },

    handleDrawerClose: () => {
      setOpen(false);
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        transition: "0.7s",
      }}
    >
      <UseTodoProvider>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <AppNavbar
            open={open}
            colorMode={colorMode}
            handleDrawerClose={handlers.handleDrawerClose}
            handleDrawerOpen={handlers.handleDrawerOpen}
            theme={theme}
          />
        </AppBar>
        <Drawer
          sx={{
            width: APP_SIDEBAR_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: APP_SIDEBAR_WIDTH,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <AppSidebar />
        </Drawer>
        <DrawerAnimation open={open}>
          <DrawerHeader />
          <Outlet />
        </DrawerAnimation>
      </UseTodoProvider>
    </Box>
  );
}
