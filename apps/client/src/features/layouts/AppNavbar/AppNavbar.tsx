import Toolbar from "@mui/material/Toolbar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Theme } from "@mui/material";
import { FC } from "react";
import { AccountMenu } from "../../AccountMenu";

interface Props {
  open: boolean;
  theme: Theme;
  colorMode: any;
  handleDrawerClose: any;
  handleDrawerOpen: any;
}

export const AppNavbar: FC<Props> = ({
  open,
  theme,
  colorMode,
  handleDrawerClose,
  handleDrawerOpen,
}) => {
  return (
    <>
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
            <Brightness4Icon htmlColor="white" />
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
    </>
  );
};
