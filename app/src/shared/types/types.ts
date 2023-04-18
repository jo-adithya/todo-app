export enum TodoActionKind {
  CREATE,
  UPDATE_TODO,
  UPDATE_STATUS,
  DELETE,
  CLEAR,
}

export interface TodoProps {
  [id: string]: {
    todo: string;
    completed: boolean;
  };
}

export interface TodoState {
  todos: TodoProps;
  length: number;
  activeLength: number;
}

export type TodoAction =
  | {
      type: TodoActionKind.CREATE;
      todo: string;
    }
  | {
      type: TodoActionKind.UPDATE_TODO;
      newTodo: string;
      id: string;
    }
  | {
      type: TodoActionKind.DELETE | TodoActionKind.UPDATE_STATUS;
      id: string;
    }
  | {
      type: TodoActionKind.CLEAR;
    };

export interface TodoItemProps {
  id: string;
  todo: string;
  completed: boolean;
  updateStatus: (id: string) => void;
  deleteTodo: (id: string) => void;
}