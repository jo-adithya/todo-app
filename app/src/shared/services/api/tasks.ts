import { makeFetch } from '@shared/utils/utils';
import { GoogleList, TaskList, Task } from 'types';

export const findTasklist = async (token: string): Promise<string | null> => {
  const options = {
    method: 'GET' as const,
    url: 'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
    token,
  };

  const response = await makeFetch<GoogleList<TaskList>>(options);
  const tasklist = response.items.filter(
    (tasklist) => tasklist.title === 'TodoApp'
  )[0];
  if (!tasklist) return null;
  return tasklist.id;
};

export const createTasklist = async (token: string) => {
  const options = {
    method: 'POST' as const,
    url: 'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
    body: { title: 'TodoApp' },
    token,
  };

  const response = await makeFetch<TaskList>(options);
  if (!response) return null;
  return response.id;
};

export const getTasklistId = async (token: string) => {
  let id: string | null;
  id = await findTasklist(token);
  if (id) return id;

  id = await createTasklist(token);
  if (id) return id;

  return null;
};

export const getTodos = async (token: string, tasklistId: string) => {
  const options = {
    method: 'GET' as const,
    url: `https://tasks.googleapis.com/tasks/v1/lists/${tasklistId}/tasks`,
    token,
  };

  const tasks = await makeFetch<GoogleList<Task>>(options);
  return tasks.items;
};

export const addTodo = async (
  token?: string | null,
  tasklistId?: string | null,
  todo?: Partial<Task>
) => {
  if (!token) throw new Error('Failed to add todo: no token found!');
  if (!tasklistId) throw new Error('Failed to add todo: no tasklist id found!');
  if (!todo || !todo.title) throw new Error('Failed to add todo: no todo found!');

  const options = {
    method: 'POST' as const,
    url: `https://tasks.googleapis.com/tasks/v1/lists/${tasklistId}/tasks`,
    body: todo,
    token,
  };

  await makeFetch(options);
};
