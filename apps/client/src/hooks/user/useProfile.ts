import { useCallback, useMemo } from "react";
import { EditProfileNickName, EditProfilePassword } from "../../types";
import { useFetcher } from "../axios/useFetcher";
import { useTodo } from "..";
import { useSignOut } from "react-auth-kit";

export const useProfile = () => {
  const signOut = useSignOut();
  const { fetcher } = useFetcher();
  const { profileData, setProfileData } = useTodo();

  const getProfileData = useCallback(async () => {
    try {
      const res = await fetcher.get("/users/me");

      if (res.status === 200) {
        setProfileData(res.data);
      }
    } catch (err) {
      signOut();
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    try {
      const res = await fetcher.delete("/users/me");

      if (res.status === 204) {
        setProfileData(undefined);
      }
    } catch (err) {
      signOut();
    }
  }, []);

  const updateAccountNickName = useCallback(
    async (newData: EditProfileNickName) => {
      try {
        const data = {
          nickName: newData.nickName,
        };

        const res = await fetcher.patch("/users/me/edit/nickname", data);

        if (res.status === 200) {
          getProfileData();
        }
      } catch (err: any) {
        if (err.response.status === 403) {
          alert("Error: The nickname is occupied by another user");
        } else {
          alert("Forbidden: Access to the resource is denied");
        }
      }
    },
    []
  );

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
