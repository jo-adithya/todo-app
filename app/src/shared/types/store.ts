import { Dayjs } from 'dayjs';

export type CalendarSlice = {
  calendarId: string | null;
  date: Dayjs | null;
  setDate: (date: Dayjs) => void;
  setCalendarId: () => void;
}

export type AuthSlice = {
  token: null | string;
  user: string | null;
  setToken: (token: string) => void;
  setUser: (user: string) => void;
  logout: () => void;
}

// export type TaskSlice = {
//   tasklistId: string | null;

// }