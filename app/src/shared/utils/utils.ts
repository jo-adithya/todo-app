import { Calendar, GoogleList } from '../types/globals';

interface FetchProps {
  url: string;
  method: "GET" | "POST";
  body?: unknown;
  token?: string;
}

export const makeFetch = async <T>({
  url,
  method,
  body,
  token,
}: FetchProps): Promise<T> => {
  const options = {
    method,
    body: JSON.stringify(body),
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    const res = await response.json();
    console.error(response, res);
    throw new Error("Fetching Error!");
  }

  const res = await response.json();
  return res;
};
