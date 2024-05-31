import { useCallback, useMemo } from "react";
import { IToDoProject } from "../../types";
import { useFetcher } from "../axios/useFetcher";
import { useSearchParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import _orderBy from "lodash/orderBy";
import useSWRMutation from "swr/mutation";

export const useProjects = () => {
  const { fetcher, getData, postItem, deleteItem, patchItem } = useFetcher();

  const { mutate } = useSWRConfig();

  const getProjects = useCallback(() => {
    const { data, isLoading, error } = useSWR<IToDoProject[]>(
      "/projects",
      getData,
      {
        compare: (a, b) => {
          return a === b;
        },
      }
    );

    if (error) null;

    return {
      isLoading,
      data,
    };
  }, []);

  const createProject = useCallback(() => {
    const { trigger, error } = useSWRMutation("/projects", (url, arg) =>
      postItem(url, arg)
    );

    if (error)
      alert(
        "Error: Failed to add the project. Reload the page or log in again"
      );

    return {
      trigger,
    };
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    const { trigger, error } = useSWRMutation<any>(
      `/projects/${projectId}`,
      deleteItem,
      { onSuccess: () => mutate(`/projects`) }
    );

    if (error)
      alert(
        "Error: Failed to delete the project. Reload the page or log in again"
      );

    return {
      trigger,
    };
  }, []);

  const editProject = useCallback(
    async (projectId: string, newTitle: string) => {
      try {
        const data = { title: newTitle };
        const res = await fetcher.patch(`/projects/${projectId}`, data);

        if (res.status === 200) {
          null;
        }
      } catch (err) {
        alert(
          "Error: Failed to change the project. Reload the page or log in again"
        );
      }
    },
    []
  );

  const filterProjects = useCallback(() => {
    const { data: projects, isLoading } = getProjects();
    const [searchParams] = useSearchParams();

    const searchProjects = searchParams.get("searchProjects") || "";

    let filteredProjects = projects;
    // поиск по названию
    if (searchProjects) {
      filteredProjects = projects?.filter((task) =>
        task.title.toLowerCase().includes(searchProjects)
      );
    }

    return {
      projects: _orderBy(filteredProjects, ["createdAt"], ["desc"]),
      isLoading,
    };
  }, []);

  const findProject = useCallback((projectId?: string) => {
    const { data: projects } = getProjects();

    return projects
      ? projects.find((project) => project.id === projectId)
      : null;
  }, []);

  return useMemo(
    () => ({
      getProjects,
      createProject,
      filterProjects,
      deleteProject,
      editProject,
      findProject,
    }),
    [
      getProjects,
      createProject,
      filterProjects,
      deleteProject,
      editProject,
      findProject,
    ]
  );
};
