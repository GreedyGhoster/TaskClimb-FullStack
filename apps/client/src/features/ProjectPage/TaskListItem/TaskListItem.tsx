import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FC } from "react";
import { UseRenderModeProvider, useTasks } from "../../../hooks";
import { IToDoTask, RenderMode } from "../../../types";
import { RenderModeController } from "../../../components/ctrl";
import { EditTaskInlineForm } from "./EditTaskInlineForm";
import { TaskRoute } from "../../../routes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { TaskChip } from "../../../components/tasks";
import { TaskListItemTemplate } from "../../../components/styled/TaskListItem";

interface Props {
  task: IToDoTask;
}

const TaskListItem: FC<Props> = ({ task }) => {
  const { deleteTask } = useTasks();
  const { trigger } = deleteTask(task.id, task.projectId);

  return (
    <UseRenderModeProvider defaultMode={RenderMode.View} key={task.id}>
      <TaskListItemTemplate>
        <RenderModeController
          renderView={(onChangeRenderMode) => (
            <ListItem
              sx={{
                padding: "0",
              }}
              component={"div"}
            >
              <Tooltip title="Click to view the description" placement="left">
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    height: "3rem",
                    overflowWrap: "break-word",
                  }}
                  href={TaskRoute(task.projectId, task.id)}
                >
                  <ListItemText
                    sx={
                      task.status === "Done"
                        ? {
                            padding: "0",
                            color: "#919191",
                            textDecoration: "line-through",
                          }
                        : {
                            padding: "0",
                          }
                    }
                    primary={task.title}
                  />
                </ListItemButton>
              </Tooltip>
              <Box
                sx={{
                  display: "inline-flex",
                  justifyContent: "space-evenly",
                  width: "35%",
                }}
              >
                <Box
                  sx={{
                    marginTop: "2px",
                    width: "4rem",
                  }}
                >
                  <TaskChip status={task.status} />
                </Box>
                <Box>
                  <IconButton
                    onClick={() => onChangeRenderMode(RenderMode.Edit)}
                    color="secondary"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton
                    onClick={async () => await trigger()}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          )}
          renderEdit={(onChangeRenderMode) => (
            <EditTaskInlineForm
              task={task}
              onCancel={() => onChangeRenderMode(RenderMode.View)}
            />
          )}
        />
      </TaskListItemTemplate>
    </UseRenderModeProvider>
  );
};

export default TaskListItem;
