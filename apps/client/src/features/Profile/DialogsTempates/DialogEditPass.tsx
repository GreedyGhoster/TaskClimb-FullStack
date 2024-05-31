import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FC, useCallback } from "react";
import { useProfile } from "../../../hooks";
import { EditProfilePassword } from "../../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";

interface Props {
  openDialogEditPass: any;
  handleCloseEditPass: any;
}

export const DialogEditPass: FC<Props> = ({
  openDialogEditPass,
  handleCloseEditPass,
}) => {
  const { updateAccountPassword } = useProfile();
  const { trigger } = updateAccountPassword();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<EditProfilePassword>({ mode: "onBlur" });

  const FetchData: SubmitHandler<EditProfilePassword> = useCallback(
    async (passwords: EditProfilePassword) => {
      await trigger(passwords as any);
      reset();
    },
    [updateAccountPassword, reset]
  );

  return (
    <Dialog open={openDialogEditPass} onClose={handleCloseEditPass}>
      <DialogTitle>Change password</DialogTitle>
      <DialogContent>
        Are you sure you want to change your password?
        <DialogContentText></DialogContentText>
        <Box component={"form"} onSubmit={handleSubmit(FetchData)}>
          <TextField
            {...register("oldPassword", {
              required: "The field must be filled in",
              minLength: {
                value: 8,
                message: "Minimum of 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum of 20 characters",
              },
            })}
            margin="dense"
            id="oldPassword"
            name="oldPassword"
            label="Old password"
            type="password"
            fullWidth
            variant="standard"
            error={!!errors.oldPassword}
          />
          <div style={{ color: "#f44336", height: "15px" }}>
            {errors.oldPassword && <span>{errors.oldPassword.message}</span>}
          </div>

          <TextField
            {...register("newPassword", {
              required: "The field must be filled in",
              minLength: {
                value: 8,
                message: "Minimum of 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum of 20 characters",
              },
            })}
            margin="dense"
            id="newPassword"
            name="newPassword"
            label="New password"
            type="password"
            fullWidth
            variant="standard"
            error={!!errors.newPassword}
          />
          <div style={{ color: "#f44336", height: "15px" }}>
            {errors.newPassword && <span>{errors.newPassword.message}</span>}
          </div>
          <DialogActions>
            <Button onClick={handleCloseEditPass}>Cancel</Button>
            <Button
              type="submit"
              disabled={!isValid}
              onClick={handleCloseEditPass}
            >
              Change
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
