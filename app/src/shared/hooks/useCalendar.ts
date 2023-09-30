import { useCallback, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useStore } from '@store';
import dayjs, { Dayjs } from 'dayjs';
import { AuthContext } from '../context/auth-context';
import {
  findCalendar,
  createCalendar,
  getCalendarId,
} from '@shared/services/api/calendar';
import { getEvents } from '@shared/services/api/events';

// export const useCalendar = () => {
//   const [calendarId, setCalendarId] = useState("");
//   const [date, setDate] = useState<Dayjs | null>(dayjs());
//   const { token } = useContext(AuthContext);

//   const setCalendar = useCallback(async () => {
//     if (!token) return;

//     let id: string | null;
//     id = await findCalendar(token);
//     if (id) {
//       setCalendarId(id);
//       return;
//     }

//     id = await createCalendar(token);
//     if (!id) return;
//     setCalendarId(id);
//   }, [token]);

//   const addEvent = useCallback(async () => {
//     if (!token) return;
//   }, [token]);

//   useEffect(() => {
//     setCalendar();
//   }, [setCalendar]);

//   return { date, setDate, addEvent };
// };

export const useCalendar = () => {
  const token = useStore((state) => state.token);
  const { data: calendarId, refetch: fetchCalendarId } = useQuery(
    ['calendarId', token],
    () => {
      if (!token) return null;
      return getCalendarId(token);
    },
    {
      enabled: !!token,
    }
  );

  const state = useQuery(
    ['events', { calendarId, token }],
    () => getEvents(calendarId, token),
    {
      enabled: !!calendarId,
    }
  );

  return { ...state, fetchCalendarId };
};
