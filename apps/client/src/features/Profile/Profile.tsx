import { ListItem, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useStore } from "../../hooks";
import { ProfileTemplate } from "../../components/styled/Profile";
import {
  ChangeNickname,
  DeleteAccount,
  ChangePassword,
} from "./ProfileFeatures";

export default function Profile() {
  const { profileData } = useStore();

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
        <ListItem>CreatedAt: {profileData?.createdAt}</ListItem>
        <ListItem>UpdatedAt: {profileData?.updatedAt}</ListItem>
      </List>

      <Stack alignSelf="center" direction="column" spacing={2}>
        <ChangeNickname />
        <ChangePassword />
        <DeleteAccount />
      </Stack>
    </ProfileTemplate>
  );
}
