export const ProjectRoute = (projectId: string) => `/projects/${projectId}`;
export const TaskRoute = (projectId: string, taskId: string) =>
  `/projects/${projectId}/${taskId}`;
