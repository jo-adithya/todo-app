import { CalendarProps, Calendars } from '../types/types';

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
}: FetchProps): Promise<T | null> => {
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
    console.log(response, res);
    return null;
  }

  const res = await response.json();
  return res;
};

export const createCalendar = async (token: string): Promise<string | null> => {
  const options = {
    method: "POST" as const,
    url: "https://www.googleapis.com/calendar/v3/calendars",
    body: { summary: "Todos" },
    token,
  };
  const response = await makeFetch<CalendarProps>(options);
  if (!response) return null;
  return response.id;
};

export const findCalendar = async (token: string): Promise<string | null> => {
  const options = {
    method: "GET" as const,
    url: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    token,
  };
  const response = await makeFetch<Calendars<CalendarProps>>(options);
  if (!response) return null;
  const calendars = response.items;
  const calendar = calendars.filter(
    (calendar: any) => calendar.summary === "Todos"
  )[0];
  if (!calendar) return null;
  return calendar.id;
};

export const getCalendarId = async (token: string) => {
  let id: string | null;
  id = await findCalendar(token);
  if (id) return id;

  id = await createCalendar(token);
  if (!id) return;
  return id;
}
