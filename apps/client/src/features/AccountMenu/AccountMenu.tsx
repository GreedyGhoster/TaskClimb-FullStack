import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { DialogLogout } from "../../components/DialogsTempates";

const AccountMenu = () => {
  const signOut = useSignOut();
  const authUser = useAuthUser()();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const goRegister = () => {
    navigate("/auth/register");
  };

  const handlers = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },

    handleCloseBar: () => {
      setAnchorEl(null);
    },

    handleOpenReq: () => {
      setOpen(true);
    },

    handleCloseReq: () => {
      setOpen(false);
    },

    handleAgree: () => {
      goRegister();
      signOut();
      setOpen(false);
    },
  };

  return (
    <>
      <Typography component={"h4"}>{authUser!.nickName}</Typography>
      <IconButton onClick={handlers.handleClick}>
        <AccountCircleIcon htmlColor="white" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handlers.handleCloseBar}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <ListItemButton href="/users/me">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </ListItemButton>
        <ListItemButton onClick={handlers.handleOpenReq}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </ListItemButton>
        <DialogLogout
          openDialogLogout={open}
          handleAgree={handlers.handleAgree}
          handleCloseReq={handlers.handleCloseReq}
        />
      </Menu>
    </>
  );
};

export default AccountMenu;
