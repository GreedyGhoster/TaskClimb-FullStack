import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useProjects, useTasks } from "../../hooks";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { TaskEditForm } from "./EditForm";
import { TaskPageTemplate } from "../../components/styled/TaskPage";
import { Modal } from "@mui/material";
import { FC } from "react";
import { IToDoTask } from "../../types";

type Props = {
  tasks: IToDoTask[];
};

export const TaskModal: FC<Props> = ({ tasks }) => {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const [searchParams] = useSearchParams();
  const { findProject } = useProjects();
  const { findTask } = useTasks();

  const taskId = searchParams.get("taskId");

  const project = findProject(projectId);
  const task = findTask(projectId, taskId!, tasks);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/projects/${projectId}`);
  };

  if (!project || !task) {
    return null;
  }

  return (
    <Modal
      open={!!taskId}
      style={{
        backgroundColor: "#161b2266",
      }}
      hideBackdrop
      keepMounted
      disableAutoFocus
    >
      <TaskPageTemplate>
        <Box
          sx={{
            display: "inline-flex",
            marginTop: "2%",
            marginBottom: "1%",
            width: "90%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              overflowWrap: "anywhere",
            }}
            component={"div"}
            onClick={(e) => e.preventDefault()}
          >
            <Typography variant="h4">{task.title}</Typography>
          </Box>
          <Tooltip title="Go back" placement="bottom">
            <Button
              sx={{
                float: "right",
                margin: "auto",
                marginRight: 0,
              }}
              onClick={goBack}
              variant="outlined"
            >
              Close
            </Button>
          </Tooltip>
        </Box>
        <Box
          sx={{
            width: "85%",
            alignSelf: "center",
          }}
        >
          <TaskEditForm task={task} projectId={project.id} />
        </Box>
      </TaskPageTemplate>
    </Modal>
  );
};
