"use client";

import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths,
} from "date-fns-jalali";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [current, setCurrent] = React.useState<Date>(() => new Date());

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 6 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 6 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const selectedDay = selected;
  const today = new Date();

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const weekdays = [
    "شنبه",
    "یک‌شنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];

  const handleSelect = (date: Date) => {
    onSelect?.(date);
  };

  return (
    <div
      className={cn(
        "p-4 bg-white rounded-2xl shadow-md w-[340px] text-right space-y-2",
        className
      )}
      dir="rtl"
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrent((prev) => subMonths(prev, 1))}
          className={cn(buttonVariants({ variant: "ghost" }), "h-7 w-7 p-0")}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-sm font-semibold">
          {months[parseInt(format(current, "MM"), 10) - 1]}{" "}
          {format(current, "yyyy")}
        </div>
        <button
          onClick={() => setCurrent((prev) => addMonths(prev, 1))}
          className={cn(buttonVariants({ variant: "ghost" }), "h-7 w-7 p-0")}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-muted-foreground mb-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {calendarDays.map((day) => {
          const isCurrentMonth = isSameMonth(day, current);
          const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
          const isToday = isSameDay(day, today);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleSelect(day)}
              className={cn(
                "h-8 w-8 rounded-md text-center hover:bg-primary/10",
                !isCurrentMonth && "text-muted-foreground",
                isSelected && "bg-primary text-white",
                isToday && "border border-primary"
              )}
            >
              {format(day, "dd")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
