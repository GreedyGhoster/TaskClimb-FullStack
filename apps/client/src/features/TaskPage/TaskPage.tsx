import { useNavigate, useParams } from "react-router-dom";
import { useProjects, useTasks } from "../../hooks";
import { NotFound } from "../../components/NotFound";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { TaskEditForm } from "./EditForm";
import { TaskPageTemplate } from "../../components/styled/TaskPage";

export function TaskPage() {
  const { projectId, taskId } = useParams<{
    projectId: string;
    taskId: string;
  }>();
  const { findProject } = useProjects();
  const { findTask } = useTasks();

  const navigate = useNavigate();

  const project = findProject(projectId);
  const task = findTask(projectId, taskId);

  const goBack = () => {
    navigate(`/projects/${projectId}`);
  };

  if (!project || !task) {
    return <NotFound />;
  }

  return (
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
            Back
          </Button>
        </Tooltip>
      </Box>
      <Box
        sx={{
          width: "85%",
          alignSelf: "center",
        }}
      >
        <TaskEditForm task={task} project={project} />
      </Box>
    </TaskPageTemplate>
  );
}
