import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItem,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import styled from "@mui/material/styles/styled";
import { useTodo } from "../../hooks";
import { useState } from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const PageResponse = styled("div")(({ theme }) => ({
  backgroundColor: `${theme.palette.mode === "dark" ? "#262626" : "#f5f5f5"}`,
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  height: "auto",
  margin: "auto",
  padding: "0",
  marginTop: "3%",
  [theme.breakpoints.down("laptop")]: {
    width: "85%",
  },
  [theme.breakpoints.up("laptop")]: {
    width: "50%",
  },
}));

export default function Profile() {
  const { profileData, deleteAccount } = useTodo();
  const [open, setOpen] = useState(false);
  const signOut = useSignOut();

  const navigate = useNavigate();

  const goRegister = () => {
    navigate("/auth/register");
  };

  const handleOpenReq = () => {
    setOpen(true);
  };

  const handleCloseReq = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    goRegister();
    signOut();
    setOpen(false);
    deleteAccount();
  };

  return (
    <PageResponse>
      <Box
        sx={{
          display: "inline-flex",
          marginTop: "2%",
          marginBottom: "1%",
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Typography variant="h5">Profile</Typography>
      </Box>
      <List>
        <ListItem>NickName: {profileData?.nickName}</ListItem>
        <ListItem>CreatedAt: {profileData?.createdAt}</ListItem>
        <ListItem>UpdatedAt: {profileData?.updatedAt}</ListItem>
        <ListItem>Projects: {profileData?.projects}</ListItem>
        <ListItem>Tasks: {profileData?.tasks}</ListItem>
      </List>
      <Button color="error" onClick={handleOpenReq}>
        Delete account
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseReq}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete your account?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseReq}>Close</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </PageResponse>
  );
}
