import { cn } from '@/lib/utils'
import { format } from 'date-fns-jalali'

export default function CalendarBodyHeader({
  date,
  onlyDay = false,
}: {
  date: Date
  onlyDay?: boolean
}) {
  // تابعی برای مقایسه تاریخ شمسی (بدون توجه به ساعت)
  function isSameJalaliDay(d1: Date, d2: Date) {
    return format(d1, 'yyyy/MM/dd') === format(d2, 'yyyy/MM/dd')
  }

  const isToday = isSameJalaliDay(date, new Date())

  return (
    <div className="flex items-center justify-center gap-1 py-2 w-full sticky top-0 bg-background z-10 border-b">
      <span
        className={cn(
          'text-xs font-medium',
          isToday ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {format(date, 'eeee')} 
      </span>
      {!onlyDay && (
        <span
          className={cn(
            'text-xs font-medium',
            isToday ? 'text-primary font-bold' : 'text-foreground'
          )}
        >
          {format(date, 'dd')} 
        </span>
      )}
    </div>
  )
}
