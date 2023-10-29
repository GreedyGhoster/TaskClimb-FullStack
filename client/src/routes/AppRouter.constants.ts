export const ProjectRoute = (projectId: string) => `/${projectId}`;
export const TaskRoute = (projectId: string, taskId: string) =>
  `/${projectId}/${taskId}`;
