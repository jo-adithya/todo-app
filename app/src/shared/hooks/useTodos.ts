import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useStore } from '@store';
import { getTasklistId, getTodos, addTodo } from '@shared/services/api/tasks';
import { Task } from 'types';

export const useTodo = () => {
  const token = useStore((state) => state.token);
  const queryClient = useQueryClient();
  const { data: tasklistId, refetch: fetchTasklistId } = useQuery(
    ['tasklistId', token],
    () => {
      if (!token) return null;
      return getTasklistId(token);
    },
    {
      enabled: !!token,
    }
  );

  const state = useQuery(
    ['todos', { taskListId: tasklistId, token }],
    () => {
      if (!tasklistId || !token) return null;
      return getTodos(token, tasklistId);
    },
    {
      enabled: !!tasklistId,
    }
  );

  const addTodoMutation = useMutation(
    (newTodo: Partial<Task>) => addTodo(token, tasklistId, newTodo),
    {
      onMutate: async (newTodo: Partial<Task>) => {
        await queryClient.cancelQueries('todos');
        const previousTodos = queryClient.getQueryData<Task[]>('todos');

        if (previousTodos) {
          queryClient.setQueryData<Task[]>('todos', [
            ...previousTodos,
            { 
              id: Math.random().toString(),
              title: '',
              status: 'needsAction',
              ...newTodo 
            },
          ]);
        }

        return { previousTodos };
      },
      onError: (err, variables, context) => {
        console.log(err, variables);
        if (context?.previousTodos) {
          queryClient.setQueryData<Task[]>('todos', context.previousTodos);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  return { ...state, fetchTasklistId, addTodo: addTodoMutation.mutate };
};
