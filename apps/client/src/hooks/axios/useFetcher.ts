import axios from "axios";
import { useCallback, useMemo } from "react";
import { useAuthHeader } from "react-auth-kit";

export const useFetcher = () => {
  const authHeader = useAuthHeader()();

  const fetcher = axios.create({
    headers: { Authorization: authHeader },
    timeout: 1440,
    withCredentials: true,
    baseURL: "http://localhost:4580/api",
  });

  const authFetcher = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4580/api",
  });

  const getData = useCallback(
    async (url: string) => fetcher.get(url).then((res) => res.data),
    [fetcher]
  );

  const deleteItem = useCallback(
    async (url: string) => fetcher.delete(url),
    [fetcher]
  );

  const patchItem = useCallback(
    async (url: string, { arg }: { arg: any }) => {
      return fetcher.patch(url, arg).then((res) => res.data);
    },
    [fetcher]
  );

  const postItem = useCallback(
    async (url: string, { arg }: { arg: any }) => {
      return fetcher.post(url, arg).then((res) => res.data);
    },
    [fetcher]
  );

  return useMemo(
    () => ({ fetcher, authFetcher, getData, deleteItem, patchItem, postItem }),
    [fetcher, authFetcher, getData, deleteItem, patchItem, postItem]
  );
};
