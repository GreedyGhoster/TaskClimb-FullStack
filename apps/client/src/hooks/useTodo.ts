import constate from "constate";
import { useMemo, useState } from "react";
import { IToDoProject, IToDoTask, ProfileData } from "../types";
import _orderBy from "lodash/orderBy";

function useTodoFunc() {
  const [tasks, setTasks] = useState<IToDoTask[]>([]);
  const [projects, setProjects] = useState<IToDoProject[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();

  return useMemo(
    () => ({
      tasks,
      projects,
      setTasks,
      setProjects,
      profileData,
      setProfileData,
    }),
    [tasks, projects, setTasks, setProjects, profileData, setProfileData]
  );
}

const constateResult = constate(useTodoFunc);
export const UseTodoProvider = constateResult[0];
export const useTodo = constateResult[1];
