import { useCallback, useMemo } from "react";
import {
  EditProfileNickName,
  EditProfilePassword,
  ProfileData,
} from "../../types";
import { useFetcher } from "../axios/useFetcher";
import { useStore } from "..";
import { useSignOut } from "react-auth-kit";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useProfile = () => {
  const signOut = useSignOut();
  const { fetcher, getData, deleteItem, patchItem } = useFetcher();
  const { profileData, setProfileData } = useStore();

  const getProfileData = useCallback(() => {
    const { data, error, isLoading } = useSWR<ProfileData>(
      "/users/me",
      getData,
      { suspense: true, refreshInterval: 5000 }
    );

    if (error) signOut();

    return {
      profileData: data,
      isLoading,
    };
  }, []);

  const deleteAccount = useCallback(() => {
    const { trigger } = useSWRMutation("/users/me", deleteItem, {
      onError: () => signOut(),
    });

    return {
      trigger,
    };
  }, []);

  const updateAccountNickName = useCallback(() => {
    const { trigger, error, data } = useSWRMutation(
      "/users/me/edit/nickname",
      (url, { arg }) => patchItem(url, { arg })
    );
    if (error) signOut();
    if (data) {
      setProfileData((prev) => (prev = data));
    }

    return {
      trigger,
    };
  }, []);

  const updateAccountPassword = useCallback(
    async (newData: EditProfilePassword) => {
      try {
        const data = {
          oldPassword: newData.oldPassword,
          newPassword: newData.newPassword,
        };

        const res = await fetcher.patch("/users/me/edit/password", data);

        if (res.status === 200) {
          getProfileData();
        }
      } catch (err: any) {
        if (err.response.status === 403) {
          alert("Error: The old possword is incorrect");
        } else {
          alert("Forbidden: Access to the resource is denied");
        }
      }
    },
    []
  );

  return useMemo(
    () => ({
      getProfileData,
      profileData,
      deleteAccount,
      updateAccountNickName,
      updateAccountPassword,
    }),
    [
      getProfileData,
      profileData,
      deleteAccount,
      updateAccountNickName,
      updateAccountPassword,
    ]
  );
};
