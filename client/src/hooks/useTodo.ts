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

  const [projects, setProjects] = useState<IToDoProject[]>([]);

  const [tasks, setTasks] = useState<IToDoTask[]>([]);

  console.log(projects);

  const goRegister = () => {
    navigate("/auth/register");
  };

  const getProjects = useCallback(
    (URL: string) => {
      if (isAuthenticated()) {
        try {
          axios
            .get(URL, {
              headers: { Authorization: authHeader() },
            })
            .then((res) => setProjects(res.data));
        } catch (error) {
          alert("Failed to fetch projects");
        }
      } else {
        goRegister();
      }
    },
    [setProjects, isAuthenticated, authHeader, goRegister]
  );

  const createProject = useCallback(
    async (title: string, URL: string) => {
      if (isAuthenticated()) {
        const data = { title };

        try {
          await axios
            .post(URL, data, {
              headers: { Authorization: authHeader() },
            })
            .then(() => getProjects(URL));
        } catch (error) {
          alert("Failed to create project");
        }
      } else {
        goRegister();
      }
    },
    [isAuthenticated, authHeader, getProjects, goRegister]
  );

  const deleteProject = useCallback(
    async (projectId: string, URL: string) => {
      if (isAuthenticated()) {
        try {
          await axios
            .delete(`http://localhost:4580/projects/${projectId}`, {
              headers: { Authorization: authHeader() },
            })
            .then(() => getProjects(URL));
        } catch (error) {
          alert("Failed to delete project");
        }
      } else {
        goRegister();
      }
    },
    [projects]
  );

  const findProject = useCallback(
    (projectId?: string) => {
      return projectId
        ? projects.find((project) => project.id === projectId)
        : undefined;
    },
    [projects]
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

  const addTask = useCallback(
    (projectId: string, newTask: AddToDoTaskFormValues) => {
      setTasks((prev) => {
        const date: Date = new Date();
        const fullDate: string = `${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}/${date.getHours()}:${date.getMinutes()}`;
        return [
          {
            id: uuidv4(),
            projectId: projectId,
            createdAt: fullDate,
            ...newTask,
          },
          ...prev,
        ];
      });
    },
    []
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
      createProject,
      getProjects,
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
      createProject,
      getProjects,
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
