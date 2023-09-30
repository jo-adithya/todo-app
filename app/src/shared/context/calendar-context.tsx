// import { useCallback, useContext, useEffect, useState, createContext, ReactNode } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { AuthContext } from "../context/auth-context";
// import { getCalendarId } from '../utils/utils';

// interface CalendarContextProps {
//   date: Dayjs | null;
//   setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
// }

// export const CalendarContext = createContext<CalendarContextProps>({
//   date: null,
//   setDate: () => {},
// });

// export const CalendarProvider = ({ children }: { children: ReactNode }) => {
//   const [calendarId, setCalendarId] = useState("");
//   const [date, setDate] = useState<Dayjs | null>(dayjs());
//   const { token } = useContext(AuthContext);
  
//   const addEvent = useCallback(async () => {
//     if (!token) return;
//   }, [token]);

//   useEffect(() => {
//     if (!token) return;
//     (async () => {
//       const id = await getCalendarId(token);
//       if (id) setCalendarId(id);
//     })();
//   }, [token]);

//   return (
//     <CalendarContext.Provider value={{
//       date: date,
//       setDate: setDate
//     }}>
//       {children}
//     </CalendarContext.Provider>
//   )
// };
