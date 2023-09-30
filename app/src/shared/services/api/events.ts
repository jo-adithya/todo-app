import { makeFetch } from '@shared/utils/utils';
import { GoogleList, Event } from 'types';

export const getEvents = async (
  calendarId?: string | null,
  token?: string | null
) => {
  if (!token) throw new Error('No token found!');
  if (!calendarId) throw new Error('No calendar found!');

  const options = {
    method: 'GET' as const,
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    token,
  };
  const response = await makeFetch<GoogleList<Event>>(options);
  return response.items;
};
