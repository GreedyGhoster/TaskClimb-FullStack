import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { APP_SIDEBAR_WIDTH } from "../../features/layouts/AppLayout/AppSidebar";
import { styled } from "@mui/material/styles";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  display: "inline-flex",
  flexDirection: "row",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${APP_SIDEBAR_WIDTH}px)`,
    marginLeft: `${APP_SIDEBAR_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default AppBar;
