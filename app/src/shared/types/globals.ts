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

export interface Calendar {
  id: string;
  summary: string;
}

export type Event = {
  id: string;
  summary: string;
  start: {
    dateTime: Date;
  }
  end: {
    dateTime: Date;
  }
}

export type TaskList = {
  id: string;
  title: string;
}

export type Task = {
  id: string;
  title: string;
  status: 'needsAction' | 'completed';
  due?: string;
  completed?: string;
}

export interface GoogleList<T> {
  items: T[];
}