import { Check, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { useWeek } from "@/store/week"
import { useActivityDayQuery } from "@/hooks/useActivityDayQuery"
import { useMemo } from "react"
import { isSameDay } from "date-fns"
import { ActivityDayService } from "@/service/activity_day.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const week_days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

interface WeekdaysProps {
  activity_id: number
  cost: number
  activity_name: string
}

export function Weekdays({ activity_id, cost, activity_name }: WeekdaysProps) {
  const startOfDate = useWeek((state) => state.start_of_date)
  const endOfWeek = useWeek((state) => state.end_of_week)

  const get_current_week_days = useMemo((): Date[] | undefined => {
    if (startOfDate !== undefined && startOfDate !== null) {
      let month_days: Date[] = []
      for (let i = 0; i < 7; i++) {
        month_days.push(new Date(new Date().setDate(startOfDate.getDate() + i)))
      }
      return month_days
    } else {
      return undefined
    }
  }, [startOfDate, startOfDate])

  const current_week_days: Date[] | undefined = get_current_week_days

  const week_days_by_activity = useActivityDayQuery(
    activity_id,
    startOfDate,
    endOfWeek
  )

  const isDayActivity = (day: Data) =>
    week_days_by_activity.data?.find((_, index) =>
      isSameDay(day, week_days_by_activity.data![index].day)
    )

  function sum_cost() {
    let quantity_days: number = 0
    let days_is_done: number = 0
    let total_cost: number = cost
    if (
      week_days_by_activity.data === undefined ||
      week_days_by_activity.data?.length === 0
    ) {
      return 0
    } else {
      quantity_days = week_days_by_activity.data.length
      days_is_done = week_days_by_activity.data.filter(
        (day) => day.is_done
      ).length
      total_cost =
        quantity_days === days_is_done
          ? cost
          : Math.ceil((cost / quantity_days) * days_is_done)
    }
    return total_cost
  }

  if (week_days_by_activity.data === undefined) {
    return <div>Нет заданий</div>
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ activity_day_id, is_done }) =>
      ActivityDayService.update(activity_day_id, is_done),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity_days"] })
    },
  })

  function onSubmit(activity_day_id: number | undefined, is_done: boolean | undefined) {
    if (activity_day_id === undefined || is_done === undefined) {
      return false
    }
    mutation.mutate(() => ({ activity_day_id, is_done }))
  }

  return (
    <>
      <Label htmlFor="name">
        {activity_name} {sum_cost()}р. /{" "}
        <span className="text-black/70 dark:text-white/35">{cost}р.</span>
      </Label>
      <div className="dark:text-white/85 text-black/70 grid grid-cols-7 h-13 items-center justify-center rounded-lg bg-muted w-full py-1 px-1 space-x-2">
        {week_days_by_activity.data.length > 0 &&
          current_week_days !== undefined &&
          current_week_days.map((day: Date, index: number) => (
            <button
              key={index}
              className={cn(
                "grid justify-center items-center rounded-md px-1 py-2 text-sm font-medium space-y-1",
                isDayActivity(day)
                  ? isDayActivity(day)?.is_done
                    ? "hover:bg-primary/90 bg-primary shadow"
                    : "hover:bg-destructive/90 bg-destructive shadow"
                  : "hover:bg-card/90 hover:shadow"
              )}
              onClick={() =>
                onSubmit(isDayActivity(day)?.id, isDayActivity(day)?.is_done)
              }
            >
              <div className="text-center">{week_days.at(index)}</div>
              <div className="text-center">{day.getDate()}</div>
            </button>
          ))}
      </div>
    </>
  )
}
