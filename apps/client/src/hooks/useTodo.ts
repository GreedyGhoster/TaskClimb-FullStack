import constate from "constate";
import { useCallback, useMemo, useState } from "react";
import {
  AddToDoTaskFormValues,
  EditProfileNickName,
  EditToDoTaskFormValues,
  IToDoProject,
  IToDoTask,
  ProfileData,
} from "../types";
import { useAuthHeader } from "react-auth-kit";
import _orderBy from "lodash/orderBy";
import axios from "axios";

function useTodoFunc() {
  const authHeader = useAuthHeader()();

  const [tasks, setTasks] = useState<IToDoTask[]>([]);
  const [projects, setProjects] = useState<IToDoProject[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();

  const fetcher = axios.create({
    headers: { Authorization: authHeader },
    timeout: 1440,
    baseURL: "http://localhost:4580/api",
  });

  const getProjects = useCallback(async () => {
    const res = await fetcher.get<IToDoProject[]>("/projects");
    setProjects(res.data);
  }, []);

  const createProject = useCallback(async (title: string) => {
    const data = { title: title };
    const res = await fetcher.post("/projects", data);
    const projectId = res.data.id;
    const projectTitle = res.data.title;

    setProjects((prev) => [{ id: projectId, title: projectTitle }, ...prev]);
  }, []);

  const deleteProject = useCallback(async (projectId: string) => {
    await fetcher.delete(`/projects/${projectId}`);
    setProjects((prev) => {
      return prev.filter((project) => project.id !== projectId);
    });
  }, []);

  const editProject = useCallback(
    async (projectId: string, newTitle: string) => {
      const data = { title: newTitle };
      setProjects((prev) => {
        const next = [...prev];
        const project = next.find((val) => val.id === projectId);
        if (project) {
          fetcher.patch(`/projects/${projectId}`, data);
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

  const getTasks = useCallback(async () => {
    const res = await fetcher.get<IToDoTask[]>("/projects/tasks");
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
    async (projectId: string, newTask: AddToDoTaskFormValues) => {
      const data = {
        title: newTask.title,
        status: newTask.status,
        description: newTask.description,
      };
      const res = await fetcher.post(`/projects/${projectId}`, data);
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
      editingTask: EditToDoTaskFormValues
    ) => {
      const data = {
        title: editingTask.title,
        description: editingTask.description,
      };
      setTasks((prev) => {
        const next = [...prev];
        const task = next.find((val) => val.id === taskId);
        if (task) {
          fetcher.patch(`/projects/${projectId}/${taskId}`, data);
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

  const deleteTask = useCallback(async (taskId: string, projectId: string) => {
    await fetcher.delete(`/projects/${projectId}/${taskId}`);
    setTasks((prev) => {
      return prev.filter((task) => task.id !== taskId);
    });
  }, []);

  const statusSwitcher = useCallback(
    async (taskId: string, projectId: string, statusName: string) => {
      setTasks((prev) => {
        const next = [...prev];
        const task = next.find((val) => val.id === taskId);
        const data = { status: statusName };
        if (task) {
          fetcher.patch(`/projects/${projectId}/${taskId}`, data);
          task.status = statusName;
          return next;
        } else {
          console.log(`Задача ${taskId} не найдена`);
          return prev;
        }
      });
    },
    []
  );

  const getProfileData = useCallback(async () => {
    const res = await fetcher.get("/users/me");
    setProfileData(res.data);
  }, []);

  const deleteAccount = useCallback(async () => {
    await fetcher.delete("/users/me");
    setProfileData(undefined);
  }, []);

  const updateAccountNickName = useCallback(
    async (newData: EditProfileNickName) => {
      const data = {
        nickName: newData.nickName,
      };

      const res = await fetcher.patch("/users/me/edit/nickname", data);
      console.log(res.data);
      // setProfileData((prev) => (prev!.nickName = .nickName));
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
      getProfileData,
      profileData,
      deleteAccount,
      updateAccountNickName,
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
      getProfileData,
      profileData,
      deleteAccount,
      updateAccountNickName,
    ]
  );
}

const constateResult = constate(useTodoFunc);
export const UseTodoProvider = constateResult[0];
export const useTodo = constateResult[1];
