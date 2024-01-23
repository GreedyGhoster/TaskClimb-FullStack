import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";

interface Props {
  openDialogDelete: any;
  handleCloseDeleteReq: any;
  handleAgree: any;
}

export const DialogDelete: FC<Props> = ({
  openDialogDelete,
  handleCloseDeleteReq,
  handleAgree,
}) => {
  return (
    <Dialog
      open={openDialogDelete}
      onClose={handleCloseDeleteReq}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete your account?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseDeleteReq}>Close</Button>
        <Button onClick={handleAgree} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
