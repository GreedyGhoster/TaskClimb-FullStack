import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../../hooks";
import { NotFound } from "../NotFound";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { EditToDoTaskFormValues } from "../../types";
import { FormProvider, useForm } from "react-hook-form";
import { useCallback } from "react";
import { FormTextField } from "../../components/form";
import Tooltip from "@mui/material/Tooltip";
import TaskStatusItem from "../../components/tasks/TaskStatusItem";
import styled from "@mui/material/styles/styled";

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
  const { findProject, findTask, editTask } = useTodo();

  const project = findProject(projectId);
  const task = findTask(projectId, taskId);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/projects/${projectId}`);
  };

  if (!project || !task) {
    return <NotFound />;
  }

  const formMethods = useForm<EditToDoTaskFormValues>({
    defaultValues: {
      description: task.description,
      title: task.title,
      status: task.status,
    },
  });

  const { handleSubmit } = formMethods;

  const handleClickForm = useCallback(
    async (values: EditToDoTaskFormValues) => {
      editTask(task.id, project.id, values);
    },
    [editTask, task.id, project.id]
  );

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
        <TaskStatusItem task={task} project={project} />
        <FormProvider {...formMethods}>
          <FormTextField
            sx={{
              width: "100%",
            }}
            name={"description"}
            spellCheck="false"
            variant="standard"
            placeholder="Description in several rows"
            multiline
          />
        </FormProvider>
        <Tooltip title="Save changes">
          <Button
            sx={{
              float: "right",
              marginBottom: "2%",
              marginTop: "2%",
              marginRight: "1%",
            }}
            color="success"
            variant="outlined"
            onClick={handleSubmit(handleClickForm)}
          >
            Save
          </Button>
        </Tooltip>
      </Box>
    </PageResponse>
  );
}
