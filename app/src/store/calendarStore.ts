import {
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from "react";
import dayjs, { Dayjs } from "dayjs";
import { StateCreator } from "zustand";

import { AuthContext } from "@shared/context/auth-context";
import { getCalendarId } from "@shared/services/api/calendar";

import { AuthSlice, CalendarSlice } from "types/store";

export const createCalendarSlice: StateCreator<
  AuthSlice & CalendarSlice,
  [["zustand/subscribeWithSelector", never]],
  [],
  CalendarSlice
> = (set, get) => ({
  calendarId: null,
  date: null,
  setDate: (date) => set(() => ({ date })),
  setCalendarId: async () => {
    const token = get().token;
    let id: string | null = null;
    if (!token) id = null;
    else id = await getCalendarId(token);
    set(() => ({ calendarId: id }));
  },
});
