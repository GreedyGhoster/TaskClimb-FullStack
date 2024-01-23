import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FC } from "react";

interface Props {
  openDialogEditNick: any;
  handleCloseEditNick: any;
}

export const DialogEditNick: FC<Props> = ({
  openDialogEditNick,
  handleCloseEditNick,
}) => {
  return (
    <Dialog open={openDialogEditNick} onClose={handleCloseEditNick}>
      <DialogTitle>Change nickname</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you change your nickname, you will have to log in to your account
          again
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="nickname"
          name="nickname"
          label="New nickname"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditNick}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
