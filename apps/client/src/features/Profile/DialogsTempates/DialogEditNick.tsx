import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FC, useCallback } from "react";
import { useProfile } from "../../../hooks";
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
  const { updateAccountNickName } = useProfile();
  const { trigger } = updateAccountNickName();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<EditProfileNickName>({ mode: "onBlur" });

  const FetchData: SubmitHandler<EditProfileNickName> = useCallback(
    async (nickName: EditProfileNickName) => {
      const data = { nickName: nickName.nickName };

      await trigger(data as any);
      reset();
    },
    [reset, trigger]
  );

  return (
    <Dialog open={openDialogEditNick} onClose={handleCloseEditNick}>
      <DialogTitle>Change nickname</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to change your nickname?
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
                message: "Maximum of 17 characters",
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
          <div style={{ color: "#f44336", height: "15px" }}>
            {errors.nickName && <span>{errors.nickName.message}</span>}
          </div>
          <DialogActions>
            <Button onClick={handleCloseEditNick}>Cancel</Button>
            <Button
              type="submit"
              disabled={!isValid}
              onClick={handleCloseEditNick}
            >
              Change
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
