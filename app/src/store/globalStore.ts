import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { createCalendarSlice } from './calendarStore';
import { createUserSlice } from './userStore';
import { AuthSlice, CalendarSlice } from '@shared/types/store';

export const useStore = create<AuthSlice & CalendarSlice>()(
  subscribeWithSelector((...a) => ({
    ...createUserSlice(...a),
    ...createCalendarSlice(...a),
  }))
);
