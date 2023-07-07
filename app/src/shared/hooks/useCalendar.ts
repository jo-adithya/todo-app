import { useCallback, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AuthContext } from "../context/auth-context";
import { findCalendar, createCalendar } from '../lib/helper';

export const useCalendar = () => {
  const [calendarId, setCalendarId] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { token } = useContext(AuthContext);

  const setCalendar = useCallback(async () => {
    if (!token) return;

    let id: string | null;
    id = await findCalendar(token);
    if (id) {
      setCalendarId(id);
      return;
    }

    id = await createCalendar(token);
    if (!id) return;
    setCalendarId(id);
  }, [token]);

  const addEvent = useCallback(async () => {
    if (!token) return;
  }, [token]);

  useEffect(() => {
    setCalendar();
  }, [setCalendar]);

  return { date, setDate, addEvent };
};
