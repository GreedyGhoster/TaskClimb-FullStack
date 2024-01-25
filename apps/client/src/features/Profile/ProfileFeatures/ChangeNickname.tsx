import Button from "@mui/material/Button";
import { DialogEditNick } from "../DialogsTempates";
import { useState } from "react";

export const ChangeNickname = () => {
  const [openDialogEditNick, setOpenDialogEditNick] = useState(false);

  const handlers = {
    handleOpenEditNick: () => {
      setOpenDialogEditNick(true);
    },

    handleCloseEditNick: () => {
      setOpenDialogEditNick(false);
    },
  };

  return (
    <>
      <Button color="warning" onClick={handlers.handleOpenEditNick}>
        Change nickname
      </Button>
      <DialogEditNick
        handleCloseEditNick={handlers.handleCloseEditNick}
        openDialogEditNick={openDialogEditNick}
      />
    </>
  );
};
