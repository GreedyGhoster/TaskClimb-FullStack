import Button from "@mui/material/Button";
import { DialogDelete } from "../DialogsTempates";
import { useState } from "react";
import { useProfile } from "../../../hooks";
import { useNavigate } from "react-router-dom";

export const DeleteAccount = () => {
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const { deleteAccount } = useProfile();
  const { trigger } = deleteAccount();

  const navigate = useNavigate();

  const goRegister = () => {
    navigate("/auth/register");
  };

  const handlers = {
    handleOpenDeleteReq: () => {
      setOpenDialogDelete(true);
    },

    handleCloseDeleteReq: () => {
      setOpenDialogDelete(false);
    },

    handleAgreeDelete: () => {
      trigger();
      goRegister();
      setOpenDialogDelete(false);
    },
  };

  return (
    <>
      <Button color="error" onClick={handlers.handleOpenDeleteReq}>
        Delete account
      </Button>
      <DialogDelete
        openDialogDelete={openDialogDelete}
        handleAgree={handlers.handleAgreeDelete}
        handleCloseDeleteReq={handlers.handleCloseDeleteReq}
      />
    </>
  );
};
