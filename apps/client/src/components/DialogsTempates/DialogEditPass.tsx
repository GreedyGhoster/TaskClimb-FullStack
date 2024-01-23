import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FC } from "react";

interface Props {
  openDialogEditPass: any;
  handleCloseEditPass: any;
}

export const DialogEditPass: FC<Props> = ({
  openDialogEditPass,
  handleCloseEditPass,
}) => {
  return (
    <Dialog open={openDialogEditPass} onClose={handleCloseEditPass}>
      <DialogTitle>Change password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you change your password, you will have to log in to your account
          again
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="oldPassword"
          name="oldPassword"
          label="Old password"
          type="password"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="newPassword"
          name="newPassword"
          label="New password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditPass}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
