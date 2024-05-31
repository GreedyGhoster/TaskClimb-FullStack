import constate from "constate";
import { useMemo, useState } from "react";
import { ProfileData } from "../types";
import _orderBy from "lodash/orderBy";

const useStoreFunc = () => {
  const [profileData, setProfileData] = useState<ProfileData>();

  return useMemo(
    () => ({
      profileData,
      setProfileData,
    }),
    [profileData, setProfileData]
  );
};

const constateResult = constate(useStoreFunc);
export const UseStoreProvider = constateResult[0];
export const useStore = constateResult[1];
