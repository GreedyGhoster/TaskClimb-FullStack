import MenuItem from "@mui/material/MenuItem";
import { InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const options = ["New", "Doing", "Done"];

const TaskStatusItem = () => {
  return (
    <Controller
      name="status"
      render={({ field }) => (
        <div
          style={{
            marginTop: "0.5rem",
          }}
        >
          <InputLabel>Status</InputLabel>
          <Select {...field}>
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    />
  );
};

export default TaskStatusItem;
