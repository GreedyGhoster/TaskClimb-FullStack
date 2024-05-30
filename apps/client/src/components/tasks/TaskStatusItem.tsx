import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import { Select } from "@mui/material";
import { Controller } from "react-hook-form";

type Props = {
  taskStatus: string;
};

const options = ["New", "Doing", "Done"];

const TaskStatusItem: FC<Props> = ({ taskStatus }) => {
  return (
    <Controller
      name="status"
      render={({ field }) => (
        <Select {...field} value={taskStatus} label="Status" variant="filled">
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default TaskStatusItem;
