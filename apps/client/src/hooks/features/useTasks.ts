import { useCallback, useMemo } from "react";
import {
  AddToDoTaskFormValues,
  EditToDoTaskFormValues,
  IToDoTask,
} from "../../types";
import { useFetcher } from "../axios/useFetcher";
import _orderBy from "lodash/orderBy";
import { useTodo } from "..";

export const useTasks = () => {
  const { fetcher } = useFetcher();
  const { tasks, setTasks } = useTodo();

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
          task.title.toLowerCase().includes(searchTerm),
        );
      }

      return _orderBy(
        filteredTasks.filter(
          (filteredTask) => filteredTask.projectId === projectId,
        ),
        ["createdAt"],
        ["desc"],
      );
    },
    [tasks],
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
    [],
  );

  const findTask = useCallback(
    (projectId?: string, taskId?: string) => {
      return tasks.find(
        (task) => task.id === taskId && task.projectId === projectId,
      );
    },
    [tasks],
  );

  const editTask = useCallback(
    async (
      taskId: string,
      projectId: string,
      editingTask: EditToDoTaskFormValues,
    ) => {
      try {
        const data = {
          title: editingTask.title,
          description: editingTask.description,
        };
        const res = await fetcher.patch(
          `/projects/${projectId}/${taskId}`,
          data,
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
          "Error: Failed to change the task. Reload the page or log in again",
        );
      }
    },
    [],
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
        "Error: Failed to delete the task. Reload the page or log in again",
      );
    }
  }, []);

  const statusSwitcher = useCallback(
    async (taskId: string, projectId: string, statusName: string) => {
      try {
        const data = { status: statusName };
        const res = await fetcher.patch(
          `/projects/${projectId}/${taskId}`,
          data,
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
          "Error: Failed to change the task. Reload the page or log in again",
        );
      }
    },
    [],
  );

  return useMemo(
    () => ({
      getTasks,
      getTasksByProject,
      addTask,
      findTask,
      editTask,
      deleteTask,
      statusSwitcher,
    }),
    [
      getTasks,
      getTasksByProject,
      addTask,
      findTask,
      editTask,
      deleteTask,
      statusSwitcher,
    ],
  );
};
