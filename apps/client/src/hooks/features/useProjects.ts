import { useCallback, useMemo } from "react";
import { IToDoProject } from "../../types";
import { useStore } from "..";
import { useFetcher } from "../axios/useFetcher";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import _orderBy from "lodash/orderBy";

export const useProjects = () => {
  const { fetcher, getData, postItem, deleteItem, patchItem } = useFetcher();

  const { setProjects } = useStore();

  const getProjects = useCallback(() => {
    const { data, isLoading, error } = useSWR<IToDoProject[]>(
      `/projects`,
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

  const filterProjects = useCallback(() => {
    const { data: projects } = getProjects();
    const [searchParams] = useSearchParams();

    const searchProjects = searchParams.get("searchProjects") || "";

    let filteredProjects = projects;
    // поиск по названию
    if (searchProjects) {
      filteredProjects = projects?.filter((task) =>
        task.title.toLowerCase().includes(searchProjects)
      );
    }

    return _orderBy(filteredProjects, ["createdAt"], ["desc"]);
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
