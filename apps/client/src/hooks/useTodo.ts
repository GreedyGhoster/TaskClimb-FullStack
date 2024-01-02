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
import _orderBy from "lodash/orderBy";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useTodoFunc() {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<IToDoTask[]>([]);
  const [projects, setProjects] = useState<IToDoProject[]>([]);

  if (!isAuthenticated()) {
    navigate("/auth/register");
  }

  const fetcher = axios.create({
    headers: { Authorization: authHeader() },
    timeout: 1440,
    baseURL: "http://localhost:4580",
  });

  const getProjects = useCallback(async (URL: string) => {
    const res = await fetcher.get<IToDoProject[]>(URL);
    setProjects(res.data);
  }, []);

  const createProject = useCallback(async (title: string, URL: string) => {
    const data = { title: title };
    const res = await fetcher.post(URL, data);
    const projectId = res.data.id;
    const projectTitle = res.data.title;

    setProjects((prev) => [{ id: projectId, title: projectTitle }, ...prev]);
  }, []);

  const deleteProject = useCallback(async (projectId: string, URL: string) => {
    await fetcher.delete(`${URL}/${projectId}`);
    setProjects((prev) => {
      return prev.filter((project) => project.id !== projectId);
    });
  }, []);

  const editProject = useCallback(
    async (projectId: string, newTitle: string, URL: string) => {
      const data = { title: newTitle };
      setProjects((prev) => {
        const next = [...prev];
        const project = next.find((val) => val.id === projectId);
        if (project) {
          fetcher.patch(`${URL}/${projectId}`, data);
          project.title = newTitle;
          return next;
        } else {
          console.log(`Проект ${projectId} не найден`);
          return prev;
        }
      });
    },
    []
  );

  const findProject = useCallback(
    (projectId?: string) => {
      return projectId
        ? projects.find((project) => project.id === projectId)
        : undefined;
    },
    [projects]
  );

  const getTasks = useCallback(async (URL: string) => {
    const res = await fetcher.get<IToDoTask[]>(URL);
    setTasks(res.data);
  }, []);

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

  const addTask = useCallback(
    async (projectId: string, newTask: AddToDoTaskFormValues, URL: string) => {
      const data = {
        title: newTask.title,
        status: newTask.status,
        description: newTask.description,
      };
      const res = await fetcher.post(`${URL}/${projectId}`, data);
      const taskId = await res.data.id;
      setTasks((prev) => {
        return [
          {
            id: taskId,
            projectId: projectId,
            ...newTask,
          },
          ...prev,
        ];
      });
    },
    []
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
    async (
      taskId: string,
      projectId: string,
      editingTask: EditToDoTaskFormValues,
      URL: string
    ) => {
      const data = {
        title: editingTask.title,
        description: editingTask.description,
      };
      setTasks((prev) => {
        const next = [...prev];
        const task = next.find((val) => val.id === taskId);
        if (task) {
          fetcher.patch(`${URL}/${projectId}/${taskId}`, data);
          task.title = editingTask.title;
          task.description = editingTask.description;
          return next;
        } else {
          console.log(`Задача ${taskId} не найдена`);
          return prev;
        }
      });
    },
    []
  );

  const deleteTask = useCallback(
    async (taskId: string, projectId: string, URL: string) => {
      await fetcher.delete(`${URL}/${projectId}/${taskId}`);
      setTasks((prev) => {
        return prev.filter((task) => task.id !== taskId);
      });
    },
    []
  );

  const statusSwitcher = useCallback(
    async (
      taskId: string,
      projectId: string,
      statusName: string,
      URL: string
    ) => {
      setTasks((prev) => {
        const next = [...prev];
        const task = next.find((val) => val.id === taskId);
        const data = { status: statusName };
        if (task) {
          fetcher.patch(`${URL}/${projectId}/${taskId}`, data);
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
        } else {
          console.log(`Задача ${taskId} не найдена`);
          return prev;
        }
      });
    },
    []
  );

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
