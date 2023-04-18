import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoActionKind, TodoState, TodoAction } from '../types/types';

const reducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionKind.CREATE:
      return {
        todos: {
          ...state.todos,
          [uuidv4()]: { todo: action.todo, completed: false },
        },
        length: state.length + 1,
        activeLength: state.activeLength + 1,
      };
    case TodoActionKind.UPDATE_TODO:
      return {
        todos: {
          ...state.todos,
          [action.id]: {
            todo: action.newTodo,
            completed: state.todos[action.id].completed,
          },
        },
        length: state.length,
        activeLength: state.activeLength,
      };
    case TodoActionKind.UPDATE_STATUS:
      return {
        todos: {
          ...state.todos,
          [action.id]: {
            todo: state.todos[action.id].todo,
            completed: !state.todos[action.id].completed,
          },
        },
        length: state.length,
        activeLength: state.todos[action.id].completed
          ? state.activeLength + 1
          : state.activeLength - 1,
      };
    case TodoActionKind.DELETE: {
      const newState = { ...state, length: state.length - 1 };
      if (!newState.todos[action.id].completed) newState.activeLength -= 1;
      delete newState.todos[action.id];
      return newState;
    }
    case TodoActionKind.CLEAR:
      const todos = Object.entries(state.todos).filter(
        ([, { completed }]) => !completed
      );
      const newState = {
        todos: Object.fromEntries(todos),
        length: todos.length,
        activeLength: todos.length,
      };
      return newState;
    default:
      return state;
  }
};

export const useTodo = () => {
  const [todoManager, dispatch] = useReducer(reducer, {
    todos: {},
    length: 0,
    activeLength: 0,
  });

  const addTodo = (todo: string) => {
    dispatch({ type: TodoActionKind.CREATE, todo });
  };

  const updateTodo = (id: string, newTodo: string) => {
    dispatch({ type: TodoActionKind.UPDATE_TODO, newTodo, id });
  };

  const updateStatus = (id: string) => {
    dispatch({ type: TodoActionKind.UPDATE_STATUS, id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: TodoActionKind.DELETE, id });
  };

  const clearTodo = () => {
    dispatch({ type: TodoActionKind.CLEAR });
  };

  return {
    todoManager,
    addTodo,
    updateTodo,
    updateStatus,
    deleteTodo,
    clearTodo,
  } as const;
};
