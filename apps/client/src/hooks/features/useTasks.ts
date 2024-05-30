import useSWR, { useSWRConfig } from "swr";
import { useCallback, useMemo } from "react";
import { IToDoTask } from "../../types";
import { useFetcher } from "../axios/useFetcher";
import _orderBy from "lodash/orderBy";
import useSWRMutation from "swr/mutation";
import { useParams, useSearchParams } from "react-router-dom";

export const useTasks = () => {
  const { getData, postItem, deleteItem, patchItem } = useFetcher();

  const { mutate } = useSWRConfig();

  const getTasks = useCallback((projectId?: string) => {
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

  const editTask = useCallback((taskId: string, projectId: string) => {
    const { trigger, error } = useSWRMutation(
      `/projects/${projectId}/${taskId}`,
      (url, arg) => patchItem(url, arg),
      { onSuccess: () => mutate(`/projects/${projectId}`) }
    );

    if (error)
      alert(
        "Error: Failed to change the task. Reload the page or log in again"
      );

    return {
      trigger,
    };
  }, []);

  const deleteTask = useCallback((taskId: string, projectId: string) => {
    const { trigger, error } = useSWRMutation<any>(
      `/projects/${projectId}/${taskId}`,
      deleteItem,
      { onSuccess: () => mutate(`/projects/${projectId}`) }
    );

    if (error)
      alert(
        "Error: Failed to delete the task. Reload the page or log in again"
      );

    return {
      trigger,
    };
  }, []);

  return useMemo(
    () => ({
      getTasks,
      filterTasks,
      addTask,
      findTask,
      editTask,
      deleteTask,
    }),
    [getTasks, filterTasks, addTask, findTask, editTask, deleteTask]
  );
};
