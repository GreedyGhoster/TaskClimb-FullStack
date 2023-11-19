import constate from "constate";
import { useMemo, useState } from "react";
import axios from "axios";

function useUserFunc() {
  const [projects, setProjects] = useState<any>();

  const setUserToLocalStorage = (res: any) => {
    localStorage.setItem("user", res);
  };

  const getUserFromLocalStorage = () => {
    return localStorage.getItem("user");
  };

  const getUser = async (token: string) => {
    const URL = "http://localhost:4580/users/me";

    const authToken = `Bearer ${token}`;

    if (token) {
      try {
        const res = await axios.get(URL, {
          headers: { Authorization: authToken },
        });
        return setUserToLocalStorage(res.data.nickName);
      } catch {
        alert("Please sign in");
      }
    }
  };

  return useMemo(
    () => ({ getUserFromLocalStorage, projects, getUser }),
    [getUserFromLocalStorage, projects, getUser]
  );
}

const constateResult = constate(useUserFunc);
export const UseUserProvider = constateResult[0];
export const useUser = constateResult[1];
