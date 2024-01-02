import { FC, useMemo } from "react";
import { Chip } from "@mui/material";

interface Props {
  status: string;
}

const TaskChip: FC<Props> = ({ status }) => {
  const getColor = useMemo(() => {
    switch (status) {
      case "New":
        return "info";
      case "Doing":
        return "secondary";
      case "Done":
        return "success";
      default:
        return "default";
    }
  }, [status]);

  const getLabel = useMemo(() => {
    switch (status) {
      case "New":
        return "New";
      case "Doing":
        return "Doing";
      case "Done":
        return "Done";
      default:
        return "-";
    }
  }, [status]);

  return (
    <Chip label={getLabel} color={getColor} variant="outlined" size="medium" />
  );
};

export default TaskChip;
