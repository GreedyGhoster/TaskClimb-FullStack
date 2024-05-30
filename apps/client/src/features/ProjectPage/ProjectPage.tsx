import { useParams } from "react-router-dom";
import { useProjects, useTasks } from "../../hooks";
import { AddTaskForm } from "./AddTaskForm";
import { SearchTaskForm } from "./SearchTaskForm";
import { Suspense, lazy, useMemo } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { NotFound } from "../../components/NotFound";
import { Counter, InputsTemplate } from "../../components/styled/ProgectPage";

const TaskListItem = lazy(() => import("./TaskListItem/TaskListItem"));

export function ProjectPage() {
  const { findProject } = useProjects();
  const { filterTasks, getTasks } = useTasks();
  const { projectId } = useParams<{ projectId: string }>();
  const project = findProject(projectId);
  const { isLoading, data } = getTasks(projectId!);
  const tasks = filterTasks(data);

  const countTasksByStatus = useMemo(() => {
    return {
      Done: tasks ? tasks.filter((task) => task.status === "Done").length : 0,
    };
  }, [tasks]);

  if (!project) {
    return <NotFound />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          marginTop: "1.5%",
        }}
        variant="h4"
      >
        {project.title}
      </Typography>
      <InputsTemplate>
        <SearchTaskForm />
        <AddTaskForm projectId={project.id} />
      </InputsTemplate>
      <Counter>
        <span>Done: {countTasksByStatus.Done}</span>
      </Counter>
      <Suspense fallback={<h3>Loading...</h3>}>
        <List
          sx={{
            width: "100%",
            paddingTop: "0px",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {!isLoading ? (
            tasks && tasks.length > 0 ? (
              <>
                {tasks.map((task) => (
                  <TaskListItem key={task.id} task={task} project={project} />
                ))}
              </>
            ) : (
              <Box sx={{ textAlign: "center" }} component={"h2"}>
                No tasks
              </Box>
            )
          ) : (
            <Box sx={{ textAlign: "center" }} component={"h2"}>
              Loading...
            </Box>
          )}
        </List>
      </Suspense>
    </Box>
  );
}
