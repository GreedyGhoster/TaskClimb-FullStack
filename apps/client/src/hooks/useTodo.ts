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
import { useAuthHeader, useSignOut } from "react-auth-kit";
import _orderBy from "lodash/orderBy";
import axios from "axios";

function useTodoFunc() {
  const authHeader = useAuthHeader()();
  const signOut = useSignOut();

  const [tasks, setTasks] = useState<IToDoTask[]>([]);
  const [projects, setProjects] = useState<IToDoProject[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();

  const fetcher = axios.create({
    headers: { Authorization: authHeader },
    timeout: 1440,
    baseURL: "http://localhost:4580/api",
  });

  const getProjects = useCallback(async () => {
    try {
      const res = await fetcher.get<IToDoProject[]>("/projects");

      if (res.status === 200) {
        setProjects(res.data);
      }
    } catch (err) {
      null;
    }
  }, []);

  const createProject = useCallback(async (title: string) => {
    try {
      const data = { title: title };
      const res = await fetcher.post("/projects", data);
      const projectId = res.data.id;
      const projectTitle = res.data.title;

      if (res.status === 201) {
        setProjects((prev) => [
          { id: projectId, title: projectTitle },
          ...prev,
        ]);
      }
    } catch (err) {
      alert(
        "Error: Failed to add the project. Reload the page or log in again"
      );
    }
  }, []);

  const deleteProject = useCallback(async (projectId: string) => {
    try {
      const res = await fetcher.delete(`/projects/${projectId}`);

      if (res.status === 204) {
        setProjects((prev) => {
          return prev.filter((project) => project.id !== projectId);
        });
      }
    } catch (err) {
      alert(
        "Error: Failed to delete the project. Reload the page or log in again"
      );
    }
  }, []);

  const editProject = useCallback(
    async (projectId: string, newTitle: string) => {
      try {
        const data = { title: newTitle };
        const res = await fetcher.patch(`/projects/${projectId}`, data);

        if (res.status === 200) {
          setProjects((prev) => {
            const next = [...prev];
            const project = next.find((val) => val.id === projectId);
            if (project) {
              project.title = newTitle;
              return next;
            } else {
              console.log(`Проект ${projectId} не найден`);
              return prev;
            }
          });
        }
      } catch (err) {
        alert(
          "Error: Failed to change the project. Reload the page or log in again"
        );
      }
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
    try {
      const res = await fetcher.get<IToDoTask[]>("/projects/tasks");

      if (res.status === 200) {
        setTasks(res.data);
      }
    } catch (err) {
      null;
    }
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
      try {
        const data = {
          title: newTask.title,
          status: newTask.status,
          description: newTask.description,
        };
        const res = await fetcher.post(`/projects/${projectId}`, data);
        const taskId = await res.data.id;

        if (res.status === 201) {
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
        }
      } catch (err) {
        alert("Error: Failed to add the task. Reload the page or log in again");
      }
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
      try {
        const data = {
          title: editingTask.title,
          description: editingTask.description,
        };
        const res = await fetcher.patch(
          `/projects/${projectId}/${taskId}`,
          data
        );

        if (res.status === 200) {
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
        }
      } catch (err) {
        alert(
          "Error: Failed to change the task. Reload the page or log in again"
        );
      }
    },
    []
  );

  const deleteTask = useCallback(async (taskId: string, projectId: string) => {
    try {
      const res = await fetcher.delete(`/projects/${projectId}/${taskId}`);

      if (res.status === 204) {
        setTasks((prev) => {
          return prev.filter((task) => task.id !== taskId);
        });
      }
    } catch (err) {
      alert(
        "Error: Failed to delete the task. Reload the page or log in again"
      );
    }
  }, []);

  const statusSwitcher = useCallback(
    async (taskId: string, projectId: string, statusName: string) => {
      try {
        const data = { status: statusName };
        const res = await fetcher.patch(
          `/projects/${projectId}/${taskId}`,
          data
        );

        if (res.status === 200) {
          setTasks((prev) => {
            const next = [...prev];
            const task = next.find((val) => val.id === taskId);

            if (task) {
              task.status = statusName;
              return next;
            } else {
              console.log(`Задача ${taskId} не найдена`);
              return prev;
            }
          });
        }
      } catch (err) {
        alert(
          "Error: Failed to change the task. Reload the page or log in again"
        );
      }
    },
    []
  );

  const getProfileData = useCallback(async () => {
    try {
      const res = await fetcher.get("/users/me");

      if (res.status === 200) {
        setProfileData(res.data);
      }
    } catch (err) {
      signOut();
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    try {
      const res = await fetcher.delete("/users/me");

      if (res.status === 204) {
        setProfileData(undefined);
      }
    } catch (err) {
      signOut();
    }
  }, []);

  const updateAccountNickName = useCallback(
    async (newData: EditProfileNickName) => {
      try {
        const data = {
          nickName: newData.nickName,
        };

        const res = await fetcher.patch("/users/me/edit/nickname", data);
        // setProfileData((prev) => (prev!.nickName = .nickName));

        if (res.status === 200) {
          console.log(res.data);
        }
      } catch (err) {
        signOut();
        // window.location.replace("/auth/register");
      }
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
