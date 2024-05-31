import { useCallback, useMemo } from "react";
import { ProfileData } from "../../types";
import { useFetcher } from "../axios/useFetcher";
import { useSignOut } from "react-auth-kit";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export const useProfile = () => {
  const signOut = useSignOut();

  const { getData, deleteItem, patchItem } = useFetcher();

  const { mutate } = useSWRConfig();

  const getProfileData = useCallback(() => {
    const {
      data: profileData,
      isLoading,
      error,
    } = useSWR<ProfileData>("/users/me", getData, {
      compare: (a, b) => {
        return a === b;
      },
      keepPreviousData: true,
    });

    if (error) signOut();

    return {
      isLoading,
      profileData,
    };
  }, []);

  const deleteAccount = useCallback(() => {
    const { trigger, error } = useSWRMutation<any>("/users/me", deleteItem, {
      onSuccess: () => signOut(),
    });

    if (error) signOut();

    return {
      trigger,
    };
  }, []);

  const updateAccountNickName = useCallback(() => {
    const { trigger, error } = useSWRMutation(
      "/users/me/edit/nickname",
      (url, arg) => patchItem(url, arg),
      { onSuccess: () => mutate("/users/me") }
    );

    if (error) alert("Error: The nickname is occupied by another user");

    return {
      trigger,
    };
  }, []);

  const updateAccountPassword = useCallback(() => {
    const { trigger, error } = useSWRMutation(
      "/users/me/edit/password",
      (url, arg) => patchItem(url, arg),
      { onSuccess: () => mutate("/users/me") }
    );

    if (error) alert("Error: The old possword is incorrect");

    return {
      trigger,
    };
  }, []);

  return useMemo(
    () => ({
      getProfileData,
      deleteAccount,
      updateAccountNickName,
      updateAccountPassword,
    }),
    [
      getProfileData,
      deleteAccount,
      updateAccountNickName,
      updateAccountPassword,
    ]
  );
};
