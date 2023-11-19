import constate from "constate";
import { useMemo } from "react";

function useAuthFunc() {
  const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem("jwtToken", token);
  };

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("jwtToken");
  };

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("jwtToken");
  };

  return useMemo(
    () => ({
      saveTokenToLocalStorage,
      getTokenFromLocalStorage,
      removeTokenFromLocalStorage,
    }),
    [
      saveTokenToLocalStorage,
      getTokenFromLocalStorage,
      removeTokenFromLocalStorage,
    ]
  );
}

const constateResult = constate(useAuthFunc);
export const UseAuthProvider = constateResult[0];
export const useAuth = constateResult[1];
