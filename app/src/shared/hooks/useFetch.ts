import { useEffect, useReducer } from 'react';

type State<T> = {
  data?: T;
  error?: Error;
  isLoading: boolean;
};

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

const fetchReducer = <T = unknown>(state: State<T>, action: Action<T>) => {
  const initialState = { data: undefined, isLoading: false, error: undefined };
  switch (action.type) {
    case 'loading':
      return { ...initialState, isLoading: true };
    case 'fetched':
      return { ...initialState, data: action.payload };
    case 'error':
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export const useFetch = <T = unknown>(url: string, options: RequestInit) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: undefined,
    error: undefined,
    isLoading: false,
  });

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      dispatch({ type: 'loading' });

      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json() as T;
        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        dispatch({ type: 'error', payload: error as Error })
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return state;
};
