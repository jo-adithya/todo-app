import { makeFetch } from '@shared/utils/utils';
import { GoogleList, Calendar } from 'types';

export const findCalendar = async (token: string): Promise<string | null> => {
  const options = {
    method: 'GET' as const,
    url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    token,
  };
  const response = await makeFetch<GoogleList<Calendar>>(options);
  if (!response) return null;
  const calendars = response.items;
  const calendar = calendars.filter(
    (calendar: any) => calendar.summary === 'Todos'
  )[0];
  if (!calendar) return null;
  return calendar.id;
};

export const getCalendarId = async (token: string) => {
  let id: string | null;
  id = await findCalendar(token);
  if (id) return id;

  id = await createCalendar(token);
  if (!id) return null;
  return id;
};

export const createCalendar = async (token: string): Promise<string | null> => {
  const options = {
    method: "POST" as const,
    url: "https://www.googleapis.com/calendar/v3/calendars",
    body: { summary: "Todos" },
    token,
  };
  const response = await makeFetch<Calendar>(options);
  if (!response) return null;
  return response.id;
};
