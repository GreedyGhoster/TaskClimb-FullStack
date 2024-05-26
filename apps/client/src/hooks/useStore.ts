import constate from "constate";
import { useMemo, useState } from "react";
import { IToDoProject, IToDoTask, ProfileData } from "../types";
import _orderBy from "lodash/orderBy";

const useStoreFunc = () => {
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
    [tasks, projects, setTasks, setProjects, profileData, setProfileData],
  );
};

const constateResult = constate(useStoreFunc);
export const UseStoreProvider = constateResult[0];
export const useStore = constateResult[1];
