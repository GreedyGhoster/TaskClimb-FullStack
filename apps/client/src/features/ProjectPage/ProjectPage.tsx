import { useParams } from "react-router-dom";
import { useTodo } from "../../hooks";
import { AddTaskForm } from "./AddTaskForm";
import { SearchTaskForm } from "./SearchTaskForm";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { NotFound } from "../../components/NotFound";
import { Counter, InputsTemplate } from "../../components/styled/ProgectPage";

const TaskListItem = lazy(() => import("./TaskListItem/TaskListItem"));

export function ProjectPage() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const { findProject, getTasksByProject } = useTodo();
  const { projectId } = useParams<{ projectId: string }>();
  const project = findProject(projectId);
  const tasks = getTasksByProject(projectId, searchTerm);

  const handleSearch = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, []);

  useEffect(() => {
    setSearchTerm(undefined);
  }, [projectId]);

  const countTasksByStatus = useMemo(() => {
    return {
      Done: tasks.filter((task) => task.status === "Done").length,
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
        <SearchTaskForm projectId={project.id} onSearch={handleSearch} />
        <AddTaskForm projectId={project.id} />
      </InputsTemplate>
      <Counter>
        <span>Done: {countTasksByStatus.Done}</span>
      </Counter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <List
          sx={{
            width: "100%",
            paddingTop: "0px",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {tasks.length > 0 ? (
            <>
              {tasks.map((task) => (
                <TaskListItem key={task.id} task={task} project={project} />
              ))}
            </>
          ) : (
            <Box sx={{ textAlign: "center" }} component={"h2"}>
              No tasks
            </Box>
          )}
        </List>
      </Suspense>
    </Box>
  );
}
