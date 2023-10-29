export enum ToDoTaskStatus {
  new = "New",
  doing = "Doing",
  done = "Done",
}

export interface AddToDoTaskFormValues {
  title: string;
  status: ToDoTaskStatus;
  description: string;
}

export type EditToDoTaskFormValues = AddToDoTaskFormValues;

export interface IToDoTask {
  id: string;
  title: string;
  status: ToDoTaskStatus;
  description: string;
  projectId: string;
  createdAt: string;
}
