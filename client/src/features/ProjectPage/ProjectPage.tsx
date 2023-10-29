import { useParams } from "react-router-dom";
import { useTodo } from "../../hooks";
import { NotFound } from "../NotFound";
import { TaskListItem } from "./TaskListItem";
import { AddTaskForm } from "./AddTaskForm";
import { SearchTaskForm } from "./SearchTaskForm";
import { useCallback, useEffect, useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

const Root = styled("div")(({ theme }) => ({
  height: "1.6rem",
  margin: "auto",
  marginTop: "0.5%",
  display: "inline-flex",
  borderBottom: "1px groove #b5b3b3",
  gap: "1rem",
  fontSize: "1.2rem",
  textAlign: "center",
  [theme.breakpoints.down("tablet")]: {
    width: "100%",
  },
  [theme.breakpoints.up("tablet")]: {
    width: "70%",
  },
  [theme.breakpoints.up("desktop")]: {
    width: "45%",
  },
}));

const Inputs = styled("div")(({ theme }) => ({
  gap: "1rem",
  textAlign: "center",
  margin: "auto",
  marginTop: "2.3%",
  [theme.breakpoints.down("laptop")]: {
    display: "table-column",
  },
  [theme.breakpoints.up("laptop")]: {
    display: "inline-flex",
  },
}));

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

  // TODO: make asynchronous calculations
  const countTasksByStatus = useMemo(() => {
    return {
      New: tasks.filter((task) => task.status === "New").length,
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
      <Inputs>
        <SearchTaskForm projectId={project.id} onSearch={handleSearch} />
        <AddTaskForm projectId={project.id} />
      </Inputs>
      <Root>
        <span>New: {countTasksByStatus.New}</span>
        <span>Done: {countTasksByStatus.Done}</span>
      </Root>
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
              <TaskListItem key={task.id} task={task} />
            ))}
          </>
        ) : (
          <Box sx={{ textAlign: "center" }} component={"h2"}>
            No tasks
          </Box>
        )}
      </List>
    </Box>
  );
}
