export interface AddToDoTaskFormValues {
  title: string;
  status: string;
  description: string;
}

export type EditToDoTaskFormValues = AddToDoTaskFormValues;

export interface IToDoTask {
  id: string;
  title: string;
  status: string;
  description: string;
  projectId: string;
}
