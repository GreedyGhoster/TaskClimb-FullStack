import { IToDoTask } from "../../types";

const addTodoOptions = (newTodo: IToDoTask) => {
  return {
    optimisticData: (todos: IToDoTask[]) => [...todos, newTodo],
    populateCache: (added: IToDoTask, todos: IToDoTask[]) => [...todos, added],
    rollbackOnError: true,
    revalidate: false,
  };
};

const updateTodoOptions = (updatedTodo: IToDoTask) => {
  return {
    optimisticData: (todos: IToDoTask[]) => {
      const prevTodos = todos.filter((item) => item.id !== updatedTodo.id);
      return [...prevTodos, updatedTodo];
    },
    populateCache: (updated: IToDoTask, todos: IToDoTask[]) => {
      const prevTodos = todos.filter((item) => item.id !== updated.id);
      return [...prevTodos, updated];
    },
    rollbackOnError: true,
    revalidate: false,
  };
};

const deleteTodoOptions = (id: string) => {
  return {
    optimisticData: (todos: IToDoTask[]) =>
      todos.filter((item) => item.id !== id),
    populateCache: (_: any, todos: IToDoTask[]) =>
      todos.filter((item) => item.id !== id),
    rollbackOnError: true,
    revalidate: false,
  };
};

export { addTodoOptions, updateTodoOptions, deleteTodoOptions };
