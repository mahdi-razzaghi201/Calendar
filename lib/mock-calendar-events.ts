import { CalendarEvent } from "@/components/calendar/calendar-types";
import { addDays } from "date-fns";
import { colorOptions } from "@/components/calendar/calendar-tailwind-classes";
// @ts-ignore
import jalaali from "jalaali-js";

const EVENT_TITLES = [
  "جلسه روزانه تیم",
  "بازبینی پروژه",
  "جلسه با مشتری",
  "کارگاه طراحی",
  "بازبینی کد",
  "برنامه‌ریزی اسپرینت",
  "نمایش محصول",
  "بحث معماری",
  "آزمون کاربری",
  "به‌روزرسانی ذی‌نفعان",
  "گفتگوی فنی",
  "برنامه‌ریزی استقرار",
  "مرتب‌سازی اشکالات",
  "برنامه‌ریزی ویژگی‌ها",
  "آموزش تیم",
];

const EVENT_COLORS = colorOptions.map((color) => color.value);

function getRandomTime(date: Date): Date {
  const hours = Math.floor(Math.random() * 14) + 8; 
  const minutes = Math.floor(Math.random() * 4) * 15;
  return new Date(date.setHours(hours, minutes, 0, 0));
}

function generateEventDuration(): number {
  const durations = [30, 60, 90, 120];
  return durations[Math.floor(Math.random() * durations.length)];
}

function getStartOfPersianMonth(date: Date): Date {
  const { jy, jm } = jalaali.toJalaali(date);
  const startOfMonthJalaali = { jy, jm, jd: 1 }; 
  const startOfMonthGregorian = jalaali.toGregorian(
    startOfMonthJalaali.jy,
    startOfMonthJalaali.jm,
    startOfMonthJalaali.jd
  );
  return new Date(
    startOfMonthGregorian.gy,
    startOfMonthGregorian.gm - 1,
    startOfMonthGregorian.gd,
    0,
    0,
    0,
    0
  );
}

export function generateMockEvents(): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const startDate = getStartOfPersianMonth(new Date()); // اول ماه شمسی به میلادی

  for (let i = 0; i < 120; i++) {
    const daysToAdd = Math.floor(Math.random() * 90);
    const eventDate = addDays(startDate, daysToAdd);

    const startTime = getRandomTime(eventDate);
    const durationMinutes = generateEventDuration();
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

    events.push({
      id: `event-${i + 1}`,
      title: EVENT_TITLES[Math.floor(Math.random() * EVENT_TITLES.length)],
      color: EVENT_COLORS[Math.floor(Math.random() * EVENT_COLORS.length)],
      description: "توضیحات نمونه",
      start: startTime,
      end: endTime,
    });
  }

  return events.sort((a, b) => a.start.getTime() - b.start.getTime());
}
