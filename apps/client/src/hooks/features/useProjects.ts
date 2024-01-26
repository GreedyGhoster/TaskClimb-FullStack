import { useCallback, useMemo } from "react";
import { IToDoProject } from "../../types";
import { useTodo } from "..";
import { useFetcher } from "../axios/useFetcher";

export const useProjects = () => {
  const { fetcher } = useFetcher();
  const { projects, setProjects } = useTodo();

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
  return useMemo(
    () => ({
      getProjects,
      createProject,
      deleteProject,
      editProject,
      findProject,
    }),
    [getProjects, createProject, deleteProject, editProject, findProject]
  );
};
