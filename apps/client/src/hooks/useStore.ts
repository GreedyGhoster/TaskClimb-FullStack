import constate from "constate";
import { useMemo, useState } from "react";
import { IToDoProject, ProfileData } from "../types";
import _orderBy from "lodash/orderBy";

const useStoreFunc = () => {
  const [projects, setProjects] = useState<IToDoProject[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>();

  return useMemo(
    () => ({
      projects,
      setProjects,
      profileData,
      setProfileData,
    }),
    [projects, setProjects, profileData, setProfileData]
  );
};

const constateResult = constate(useStoreFunc);
export const UseStoreProvider = constateResult[0];
export const useStore = constateResult[1];
