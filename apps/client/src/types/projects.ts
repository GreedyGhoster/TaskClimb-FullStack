export interface AddToDoProjectFormValues {
  title: string;
}

export type EditToDoProjectFormValues = AddToDoProjectFormValues;

export interface IToDoProject {
  createdAt: Date;
  id: string;
  title: string;
  updatedAt: Date;
  userId: string;
}
