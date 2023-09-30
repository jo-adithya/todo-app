import { StateCreator } from 'zustand';
import { AuthSlice, CalendarSlice } from '@shared/types/store';

export const createUserSlice: StateCreator<
  AuthSlice & CalendarSlice,
  [["zustand/subscribeWithSelector", never]],
  [],
  AuthSlice
> = (set, get) => {
  return {
    token: null,
    user: null,
    setToken: (token) => set(() => ({ token })),
    setUser: (user) => set(() => ({ user })),
    logout: () => set(() => ({ token: null, user: null })),
  };
};
