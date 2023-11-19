import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "../../hooks";

const AccountMenu = () => {
  const { removeTokenFromLocalStorage } = useAuth();
  const { getUserFromLocalStorage } = useUser();

  const user = getUserFromLocalStorage();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const openMenu = Boolean(anchorEl);

  const navigate = useNavigate();

  const goRegister = () => {
    navigate("/auth/register");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseBar = () => {
    setAnchorEl(null);
  };

  const handleOpenReq = () => {
    setOpen(true);
  };

  const handleCloseReq = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    goRegister();
    removeTokenFromLocalStorage();
    setOpen(false);
  };

  return (
    <>
      <Typography component={"h4"}>{user}</Typography>
      <IconButton onClick={handleClick}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseBar}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <ListItemButton href="auth/signin">
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          Sign in
        </ListItemButton>
        <ListItemButton href="auth/register">
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          Register
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </ListItemButton>
        <ListItemButton onClick={handleOpenReq}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </ListItemButton>
        <Dialog
          open={open}
          onClose={handleCloseReq}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to log out of your account?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseReq}>Close</Button>
            <Button onClick={handleAgree} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
};

export default AccountMenu;
