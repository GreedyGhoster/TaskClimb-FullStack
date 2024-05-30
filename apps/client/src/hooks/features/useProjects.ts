import { useCallback, useMemo } from "react";
import { IToDoProject } from "../../types";
import { useStore } from "..";
import { useFetcher } from "../axios/useFetcher";
import { useParams, useSearchParams } from "react-router-dom";

export const useProjects = () => {
  const { fetcher } = useFetcher();
  const { projects, setProjects } = useStore();

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

  // const filterProjects = useCallback((tasks?: IToDoTask[]) => {
  //   const { projectId } = useParams<{ projectId: string }>();
  //   const [searchParams] = useSearchParams();

  //   const searchProjects = searchParams.get("searchProjects") || "";

  //   let filteredprojects = projects;
  //   // поиск по названию
  //   if (searchProjects) {
  //      = tasks?.filter((task) =>
  //       task.title.toLowerCase().includes(searchProjects)
  //     );
  //   }

  //   return _orderBy(
  //     filteredTasks?.filter(
  //       (filteredTask) => filteredTask.projectId === projectId
  //     ),
  //     ["createdAt"],
  //     ["desc"]
  //   );
  // }, []);

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
      // filterProjects,
      deleteProject,
      editProject,
      findProject,
    }),
    [
      getProjects,
      createProject,
      // filterProjects,
      deleteProject,
      editProject,
      findProject,
    ]
  );
};
