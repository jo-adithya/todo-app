import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { PickersDay } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Badge } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export const CalendarManager = () => {
  // const { date, setDate } = useContext(CalendarContext);
  return (
    <StaticDateTimePicker
      className="!bg-bg !text-dark-primary !font-thin"
      slotProps={{ actionBar: { actions: [] } }}
      slots={{
        day: (props) => {
          const isSelected = false;

          return (
            <div className="relative flex items-center justify-center">
              <PickersDay {...props} />
              {isSelected && (
                <div className="absolute w-[5px] h-[5px] bg-dark-primary rounded-full bottom-[3px]"></div>
              )}
            </div>
          );
        },
      }}
      orientation="landscape"
      // value={date}
      // onChange={(newDate) => setDate(newDate)}
    />
  );
};
