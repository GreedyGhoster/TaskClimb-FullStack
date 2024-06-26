import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { DialogLogout } from "../Profile/DialogsTempates";
import { useProfile } from "../../hooks";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const openMenu = Boolean(anchorEl);

  const signOut = useSignOut();

  const { getProfileData } = useProfile();
  const { profileData, isLoading } = getProfileData();

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
      {!isLoading ? (
        <Typography>{profileData?.nickName}</Typography>
      ) : (
        <h4>Loading...</h4>
      )}
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
