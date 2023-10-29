import constate from "constate";
import { useCallback, useMemo, useState } from "react";
import {
  AddToDoTaskFormValues,
  EditToDoTaskFormValues,
  IToDoProject,
  IToDoTask,
  ToDoTaskStatus,
} from "../types";
import { v4 as uuidv4 } from "uuid";
import _orderBy from "lodash/orderBy";

function useTodoFunc() {
  const [projects, setProjects] = useState<IToDoProject[]>([
    { id: "home", title: "Home" },
  ]);

  const [tasks, setTasks] = useState<IToDoTask[]>([]);

  const addProject = useCallback((projectName: string) => {
    setProjects((prev) => [{ id: uuidv4(), title: projectName }, ...prev]);
  }, []);

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

  const deleteProject = useCallback((projectId: string) => {
    setProjects((prev) => {
      return prev.filter((project) => project.id !== projectId);
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
      addProject,
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
      addProject,
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
