export type ProfileData = {
  createdAt: string;
  updatedAt: string;
  nickName: string;
  projects: number;
  tasks: number;
};

export type EditProfileNickName = {
  nickName: string;
};

export type EditProfilePassword = {
  oldPassword: string;
  newPassword: string;
};
