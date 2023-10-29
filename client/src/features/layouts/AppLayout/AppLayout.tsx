import { Outlet } from "react-router-dom";
import { APP_SIDEBAR_WIDTH, AppSidebar } from "./AppSidebar";
import { UseTodoProvider } from "../../../hooks";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../../App";
import Main from "../../../components/Main/Main";
import { AccountMenu } from "../../../components/AccountMenu";
import { AppBar } from "../../../components/AppBar";
import { DrawerHeader } from "../../../components/DrawerHeader";

export function AppLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const colorMode = useContext(ColorModeContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
          <Toolbar
            sx={{
              gap: 0.6,
              width: "50%",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={{
                marginLeft: "2px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Toolbar>
          <Toolbar
            sx={{
              width: "50%",
              display: "inline-flex",
              justifyContent: "flex-end",
            }}
          >
            <AccountMenu />
          </Toolbar>
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
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </UseTodoProvider>
    </Box>
  );
}
