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
import { useTodo } from "../../hooks";
import { useEffect, useState } from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { ProfileTemplate } from "../../components/styled/Profile";

export default function Profile() {
  const { profileData, deleteAccount, projects, tasks, getProfileData } =
    useTodo();
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
    deleteAccount();
    goRegister();
    signOut();
    setOpen(false);
  };

  useEffect(() => {
    getProfileData();
  }, [projects.length, tasks.length]);

  return (
    <ProfileTemplate>
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
    </ProfileTemplate>
  );
}
