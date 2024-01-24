import Button from "@mui/material/Button";
import { DialogEditPass } from "../../../components/DialogsTempates";
import { useState } from "react";

export const ChangePassword = () => {
  const [openDialogEditPass, setOpenDialogEditPass] = useState(false);

  const handlers = {
    handleOpenEditPass: () => {
      setOpenDialogEditPass(true);
    },

    handleCloseEditPass: () => {
      setOpenDialogEditPass(false);
    },
  };

  return (
    <>
      <Button color="warning" onClick={handlers.handleOpenEditPass}>
        Change password
      </Button>
      <DialogEditPass
        handleCloseEditPass={handlers.handleCloseEditPass}
        openDialogEditPass={openDialogEditPass}
      />
    </>
  );
};
