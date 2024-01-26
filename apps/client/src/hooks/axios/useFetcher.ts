import axios from "axios";
import { useMemo } from "react";
import { useAuthHeader } from "react-auth-kit";

export const useFetcher = () => {
  const authHeader = useAuthHeader()();

  const fetcher = axios.create({
    headers: { Authorization: authHeader },
    timeout: 1440,
    baseURL: "http://localhost:4580/api",
  });

  return useMemo(() => ({ fetcher }), [fetcher]);
};
