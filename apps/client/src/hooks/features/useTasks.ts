import useSWR from "swr";
import { useCallback, useMemo } from "react";
import { EditToDoTaskFormValues, IToDoTask } from "../../types";
import { useFetcher } from "../axios/useFetcher";
import _orderBy from "lodash/orderBy";
import { useStore } from "..";
import useSWRMutation from "swr/mutation";
import { useParams, useSearchParams } from "react-router-dom";

export const useTasks = () => {
  const { fetcher, getData, postItem } = useFetcher();
  const { setTasks } = useStore();

  const getTasks = useCallback((projectId: string) => {
    const { data, isLoading, error } = useSWR<IToDoTask[]>(
      `/projects/${projectId}`,
      getData
    );

    if (error) null;

    return {
      isLoading,
      data,
    };
  }, []);

  const filterTasks = useCallback((tasks?: IToDoTask[]) => {
    const { projectId } = useParams<{ projectId: string }>();
    const [searchParams] = useSearchParams();

    const searchTasks = searchParams.get("searchTasks") || "";

    let filteredTasks = tasks;
    // поиск по названию
    if (searchTasks) {
      filteredTasks = tasks?.filter((task) =>
        task.title.toLowerCase().includes(searchTasks)
      );
    }

    return _orderBy(
      filteredTasks?.filter(
        (filteredTask) => filteredTask.projectId === projectId
      ),
      ["createdAt"],
      ["desc"]
    );
  }, []);

  const addTask = useCallback((projectId: string) => {
    const { trigger, error } = useSWRMutation(
      `/projects/${projectId}`,
      (url, arg) => postItem(url, arg)
    );

    if (error)
      alert("Error: Failed to add the task. Reload the page or log in again");

    return {
      trigger,
    };
  }, []);

  const findTask = useCallback(
    (projectId?: string, taskId?: string, tasks?: IToDoTask[]) => {
      return tasks
        ? tasks.find(
            (task) => task.id === taskId && task.projectId === projectId
          )
        : null;
    },
    []
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

  return useMemo(
    () => ({
      getTasks,
      filterTasks,
      addTask,
      findTask,
      editTask,
      deleteTask,
      statusSwitcher,
    }),
    [
      getTasks,
      filterTasks,
      addTask,
      findTask,
      editTask,
      deleteTask,
      statusSwitcher,
    ]
  );
};
