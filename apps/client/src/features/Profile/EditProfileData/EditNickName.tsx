import { TextField } from "@mui/material";
import { useTodo } from "../../../hooks";

const EditNickName = () => {
  const { updateAccountNickName } = useTodo();
  return <TextField />;
};

export default EditNickName;
