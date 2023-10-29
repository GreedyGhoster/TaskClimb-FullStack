import { useTodo } from "../../hooks";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IToDoTask } from "../../types";

interface Props {
  task: IToDoTask;
}

const options = ["New", "Doing", "Done"];

const TaskStatusItem: FC<Props> = ({ task }) => {
  const { statusSwitcher } = useTodo();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedIndex, setSelectedIndex] = useState<number>(getIndexByStatus);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function getIndexByStatus() {
    switch (task.status) {
      case "New":
        return 0;
      case "Doing":
        return 1;
      case "Done":
        return 2;
      default:
        return 0;
    }
  }

  const getColorByStatus = () => {
    switch (task.status) {
      case "New":
        return "#29b6f6";
      case "Doing":
        return "#ffae42";
      case "Done":
        return "#66bb6a";
      default:
        return "#29b6f6";
    }
  };

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    statusSwitcher(task.id, options[selectedIndex]);
  }, [selectedIndex]);

  return (
    <Box>
      <Button
        sx={{
          color: getColorByStatus,
        }}
        onClick={handleClickListItem}
      >
        {options[selectedIndex]}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TaskStatusItem;
