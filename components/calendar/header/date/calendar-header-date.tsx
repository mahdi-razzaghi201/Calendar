import CalendarHeaderDateChevrons from "./calendar-header-date-chevrons";


export default function CalendarHeaderDate() {
  return (
    <div className="flex items-center gap-2">
      {/* <CalendarHeaderDateIcon /> */}
      <div>
        <div className="flex items-center gap-1">
          {/* <p className="text-lg font-semibold">
            {dayjs(date).calendar("jalali").locale("fa").format("MMMM YYYY")}
          </p> */}
          {/* <CalendarHeaderDateBadge /> */}
        </div>
        <CalendarHeaderDateChevrons />
      </div>
    </div>
  );
}
