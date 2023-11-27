import constate from "constate";
import { useCallback, useMemo, useState } from "react";
import {
  AddToDoTaskFormValues,
  EditToDoTaskFormValues,
  IToDoProject,
  IToDoTask,
  ToDoTaskStatus,
} from "../types";
import { useIsAuthenticated, useAuthHeader } from "react-auth-kit";

import { v4 as uuidv4 } from "uuid";
import _orderBy from "lodash/orderBy";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useTodoFunc() {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<IToDoTask[]>([]);
  const [projects, setProjects] = useState<IToDoProject[]>([]);
  console.log(tasks);

  if (!isAuthenticated()) {
    navigate("/auth/register");
  }

  const fetcher = axios.create({
    headers: { Authorization: authHeader() },
    timeout: 1440,
    baseURL: "http://localhost:4580",
  });

  const getProjects = useCallback((URL: string) => {
    fetcher.get(URL).then((res) => setProjects(res.data));
  }, []);

  const createProject = useCallback(async (title: string, URL: string) => {
    const data = { title: title };

    await fetcher.post(URL, data).then(() => getProjects(URL));
  }, []);

  const deleteProject = useCallback(async (projectId: string, URL: string) => {
    await fetcher.delete(`${URL}/${projectId}`).then(() => getProjects(URL));
  }, []);

  const editProject = useCallback((projectId: string, newTitle: string) => {
    setProjects((prev) => {
      const next = [...prev];
      const project = next.find((val) => val.id === projectId);
      if (!project) {
        console.log(`Проект ${projectId} не найден`);
        return prev;
      } else {
        project.title = newTitle;
        return next;
      }
    });
  }, []);

  const findProject = useCallback(
    (projectId?: string) => {
      return projectId
        ? projects.find((project) => project.id === projectId)
        : undefined;
    },
    [projects]
  );

  const getTasks = useCallback(
    (URL: string) => {
      fetcher.get(URL).then((res) => setTasks(res.data));
    },
    [tasks]
  );

  const addTask = useCallback(
    (projectId: string, newTask: AddToDoTaskFormValues) => {
      setTasks((prev) => {
        return [
          {
            id: uuidv4(),
            projectId: projectId,
            ...newTask,
          },
          ...prev,
        ];
      });
    },
    []
  );

  const getTasksByProject = useCallback(
    (projectId?: string, searchTerm?: string) => {
      let filteredTasks = tasks;
      // поиск по названию
      if (searchTerm) {
        filteredTasks = tasks.filter((task) =>
          task.title.toLowerCase().includes(searchTerm)
        );
      }

      return _orderBy(
        filteredTasks.filter(
          (filteredTask) => filteredTask.projectId === projectId
        ),
        ["createdAt"],
        ["desc"]
      );
    },
    [tasks]
  );

  const findTask = useCallback(
    (projectId?: string, taskId?: string) => {
      return tasks.find(
        (task) => task.id === taskId && task.projectId === projectId
      );
    },
    [tasks]
  );

  const editTask = useCallback(
    (taskId: string, editingTask: EditToDoTaskFormValues) => {
      setTasks((prev) => {
        const next = [...prev];
        const task = next.find((val) => val.id === taskId);
        if (!task) {
          console.log(`Задача ${taskId} не найдена`);
          return prev;
        } else {
          task.title = editingTask.title;
          task.description = editingTask.description;
          return next;
        }
      });
    },
    []
  );

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => {
      return prev.filter((task) => task.id !== taskId);
    });
  }, []);

  const statusSwitcher = useCallback((taskId: string, statusName: string) => {
    setTasks((prev) => {
      const next = [...prev];
      const task = next.find((val) => val.id === taskId);
      if (!task) {
        console.log(`Задача ${taskId} не найдена`);
        return prev;
      } else {
        switch (statusName) {
          case "New":
            task.status = ToDoTaskStatus.new;
            return next;
          case "Doing":
            task.status = ToDoTaskStatus.doing;
            return next;
          case "Done":
            task.status = ToDoTaskStatus.done;
            return next;
          default:
            task.status = ToDoTaskStatus.new;
            return next;
        }
      }
    });
  }, []);

  return useMemo(
    () => ({
      projects,
      tasks,
      createProject,
      getProjects,
      getTasks,
      findProject,
      addTask,
      deleteTask,
      deleteProject,
      editTask,
      findTask,
      editProject,
      getTasksByProject,
      statusSwitcher,
    }),
    [
      projects,
      tasks,
      createProject,
      getProjects,
      getTasks,
      findProject,
      addTask,
      deleteTask,
      deleteProject,
      editTask,
      findTask,
      editProject,
      getTasksByProject,
      statusSwitcher,
    ]
  );
}

const constateResult = constate(useTodoFunc);
export const UseTodoProvider = constateResult[0];
export const useTodo = constateResult[1];
