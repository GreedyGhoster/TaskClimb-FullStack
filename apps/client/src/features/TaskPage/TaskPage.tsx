import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../../hooks";
import { NotFound } from "../NotFound";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import styled from "@mui/material/styles/styled";
import { TaskEditForm } from "./EditForm";

const PageResponse = styled("div")(({ theme }) => ({
  backgroundColor: `${theme.palette.mode === "dark" ? "#262626" : "#e0e0e0"}`,
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  height: "auto",
  margin: "auto",
  padding: "0",
  marginTop: "3%",
  [theme.breakpoints.down("laptop")]: {
    width: "85%",
  },
  [theme.breakpoints.up("laptop")]: {
    width: "50%",
  },
}));

export function TaskPage() {
  const { projectId, taskId } = useParams<{
    projectId: string;
    taskId: string;
  }>();
  const { findProject, findTask } = useTodo();

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
    <PageResponse>
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
    </PageResponse>
  );
}
