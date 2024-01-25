import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";

interface Props {
  handleCloseReq: any;
  openDialogLogout: any;
  handleAgree: any;
}

export const DialogLogout: FC<Props> = ({
  handleCloseReq,
  openDialogLogout,
  handleAgree,
}) => {
  return (
    <Dialog
      open={openDialogLogout}
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
  );
};
