import { Button, ListItem, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useTodo } from "../../hooks";
import { useEffect, useState } from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { ProfileTemplate } from "../../components/styled/Profile";
import {
  DialogDelete,
  DialogEditNick,
  DialogEditPass,
} from "../../components/DialogsTempates";

export default function Profile() {
  const { profileData, deleteAccount, projects, tasks, getProfileData } =
    useTodo();
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogEditNick, setOpenDialogEditNick] = useState(false);
  const [openDialogEditPass, setOpenDialogEditPass] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const goRegister = () => {
    navigate("/auth/register");
  };

  const handlers = {
    handleOpenEditNick: () => {
      setOpenDialogEditNick(true);
    },

    handleCloseEditNick: () => {
      setOpenDialogEditNick(false);
    },

    handleOpenEditPass: () => {
      setOpenDialogEditPass(true);
    },

    handleCloseEditPass: () => {
      setOpenDialogEditPass(false);
    },

    handleOpenDeleteReq: () => {
      setOpenDialogDelete(true);
    },

    handleCloseDeleteReq: () => {
      setOpenDialogDelete(false);
    },
    handleAgreeDelete: () => {
      deleteAccount();
      goRegister();
      signOut();
      setOpenDialogDelete(false);
    },
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

      <Stack alignSelf="center" direction="column" spacing={2}>
        <Button color="warning" onClick={handlers.handleOpenEditNick}>
          Change nickname
        </Button>
        <Button color="warning" onClick={handlers.handleOpenEditPass}>
          Change password
        </Button>
        <Button color="error" onClick={handlers.handleOpenDeleteReq}>
          Delete account
        </Button>
      </Stack>

      <DialogEditPass
        handleCloseEditPass={handlers.handleCloseEditPass}
        openDialogEditPass={openDialogEditPass}
      />

      <DialogEditNick
        handleCloseEditNick={handlers.handleCloseEditNick}
        openDialogEditNick={openDialogEditNick}
      />

      <DialogDelete
        openDialogDelete={openDialogDelete}
        handleAgree={handlers.handleAgreeDelete}
        handleCloseDeleteReq={handlers.handleCloseDeleteReq}
      />
    </ProfileTemplate>
  );
}
