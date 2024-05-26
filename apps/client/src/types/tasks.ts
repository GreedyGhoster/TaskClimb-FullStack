export type AddToDoTaskFormValues = {
  title: string;
  status: string;
  description: string;
};

export type EditToDoTaskFormValues = AddToDoTaskFormValues;

export type IToDoTask = {
  id: string;
  title: string;
  status: string;
  description: string;
  projectId: string;
};
