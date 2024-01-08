export interface ProfileData {
  createdAt: string;
  updatedAt: string;
  nickName: string;
  projects: number;
  tasks: number;
}

export interface EditProfileData {
  nickName: string;
  oldPassword: string;
  newPassword: string;
}
