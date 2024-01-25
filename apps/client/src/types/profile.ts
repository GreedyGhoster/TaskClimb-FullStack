export interface ProfileData {
  createdAt: string;
  updatedAt: string;
  nickName: string;
  projects: number;
  tasks: number;
}

export type EditProfileNickName = {
  nickName: string;
};
