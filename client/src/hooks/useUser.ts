import constate from "constate";
import { useMemo } from "react";
import axios from "axios";

function useUserFunc() {
  const setUser = async (token: string) => {
    const URL = "http://localhost:4580/users/me";

    const authToken = `Bearer ${token}`;

    if (token) {
      try {
        const res = await axios.get(URL, {
          headers: { Authorization: authToken },
        });
        return localStorage.setItem("user", res.data.nickName);
      } catch {
        alert("Please sign in");
      }
    }
  };

  const setProjectsArray = async (token: string) => {
    const URL = "http://localhost:4580/projects";

    const authToken = `Bearer ${token}`;

    if (token) {
      try {
        const res = await axios.get(URL, {
          headers: { Authorization: authToken },
        });
        console.log(res.data);
        return localStorage.setItem("projects", JSON.stringify(res.data));
      } catch {
        alert("Please sign in");
      }
    }
  };

  const getProjects = () => {
    const storedData = localStorage.getItem("projects");
    console.log(JSON.parse(storedData!));
    return JSON.parse(storedData!);
  };

  const getUser = () => {
    return localStorage.getItem("user");
  };

  return useMemo(
    () => ({
      getUser,
      getProjects,
      setUser,
      setProjectsArray,
    }),
    [getUser, getProjects, setUser, setProjectsArray]
  );
}

const constateResult = constate(useUserFunc);
export const UseUserProvider = constateResult[0];
export const useUser = constateResult[1];
