import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FC, useCallback } from "react";
import { useTodo } from "../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditProfileNickName } from "../../../types";
import { Box } from "@mui/material";

interface Props {
  openDialogEditNick: any;
  handleCloseEditNick: any;
}

export const DialogEditNick: FC<Props> = ({
  openDialogEditNick,
  handleCloseEditNick,
}) => {
  const { updateAccountNickName } = useTodo();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<EditProfileNickName>({ mode: "onBlur" });

  const FetchData: SubmitHandler<EditProfileNickName> = useCallback(
    async (nickName: EditProfileNickName) => {
      updateAccountNickName(nickName);
      reset();
    },
    [updateAccountNickName, reset]
  );

  return (
    <Dialog open={openDialogEditNick} onClose={handleCloseEditNick}>
      <DialogTitle>Change nickname</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you change your nickname, you will have to log in to your account
          again
        </DialogContentText>
        <Box component={"form"} onSubmit={handleSubmit(FetchData)}>
          <TextField
            {...register("nickName", {
              required: "The field must be filled in",
              minLength: {
                value: 5,
                message: "Minimum of 5 characters",
              },
              maxLength: {
                value: 15,
                message: "Maximum of 15 characters",
              },
            })}
            margin="dense"
            id="nickname"
            placeholder="Nickname"
            type="text"
            fullWidth
            variant="standard"
            error={!!errors.nickName}
          />
          <div style={{ color: "#f44336", height: "32px" }}>
            {errors.nickName && <span>{errors.nickName.message}</span>}
          </div>
          <DialogActions>
            <Button onClick={handleCloseEditNick}>Cancel</Button>
            <Button type="submit" disabled={!isValid}>
              Change
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
