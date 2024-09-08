import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { useWeek } from "@/store/week"
import {
  useActivityDayQuery,
  useCreateActivityDay,
  useDeleteActivityDay,
  useUpdateActivityDayCheck,
} from "@/hooks/useActivityDayQuery"
import { useMemo } from "react"
import { eachDayOfInterval, isSameDay } from "date-fns"
import { IActivitiesDay } from "@/store/types"
import { useSwitchEdit } from "@/store/switch_edit"
import { EditActivityButton } from "./EditActivity"
import { SumCost } from "./sumCost"
import currencyFormatMoney from "@/service/current.format.money"

const week_days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

interface WeekdaysProps {
  activity_id: number
  cost: number
  activity_name: string
}

export function Activity({ activity_id, cost, activity_name }: WeekdaysProps) {
  const startOfDate = useWeek((state) => state.start_of_date)
  const endOfWeek = useWeek((state) => state.end_of_week)
  const isSwitch = useSwitchEdit((state) => state.isEdit)

  const current_week_days = useMemo((): Date[] | undefined => {
    if (
      startOfDate !== undefined &&
      startOfDate !== null &&
      endOfWeek !== undefined &&
      endOfWeek !== null
    ) {
      const month_days = eachDayOfInterval({
        start: startOfDate,
        end: endOfWeek,
      })
      return month_days
    } else {
      return undefined
    }
  }, [startOfDate, endOfWeek])

  const week_days_by_activity = useActivityDayQuery(
    activity_id,
    startOfDate,
    endOfWeek
  )

  const isDayActivity = (day: Date) =>
    week_days_by_activity.data?.find((_, index) =>
      isSameDay(day, week_days_by_activity.data![index].day)
    )

  const updateMutation = useUpdateActivityDayCheck()
  const createMutation = useCreateActivityDay()
  const deleteMutation = useDeleteActivityDay(activity_id)

  const onSubmitUpdate = (data: Omit<IActivitiesDay, "day">) => {
    updateMutation.mutate({
      id: data.id,
      is_done: !data.is_done,
      activity_id: activity_id,
    })
  }

  const onSubmitCreate = (data: Omit<IActivitiesDay, "id" | "is_done">) => {
    createMutation.mutate(data)
  }

  const onSubmitDelete = (data: Omit<IActivitiesDay, "is_done">) => {
    deleteMutation.mutate(data)
  }

  if (week_days_by_activity.data == undefined) {
    return <div>Нет заданий</div>
  }
  return (
    <>
      <Label htmlFor="name">
        <div className="flex justify-between items-center">
          <div className="my-2">
            {activity_name}{" "}
            <SumCost
              week_days_by_activity={week_days_by_activity.data}
              cost={cost}
            />
            
            <span className="text-black/60 dark:text-white/35">
            {" "}/{currencyFormatMoney(cost)}
            </span>
          </div>
          <div>
            {isSwitch && <EditActivityButton activity_id={activity_id} />}
          </div>
        </div>
      </Label>
      <div className="dark:text-white/85 text-black/70 grid grid-cols-7 items-center justify-center rounded-lg bg-muted w-full py-1 px-1 space-x-2">
        {week_days_by_activity.data &&
          current_week_days !== undefined &&
          current_week_days.map((day: Date, index: number) => (
            <button
              key={index}
              className={cn(
                "grid justify-center items-center rounded-md px-1 py-2 text-sm font-medium space-y-1 transition-colors",
                isDayActivity(day)
                  ? isDayActivity(day)?.is_done
                    ? "hover:bg-primary/90 bg-primary shadow"
                    : "hover:bg-destructive/90 bg-destructive shadow"
                  : "hover:bg-card/90 hover:shadow"
              )}
              onClick={() =>
                isSwitch
                  ? isDayActivity(day)?.id !== undefined
                    ? onSubmitDelete({
                        id: isDayActivity(day)?.id!,
                        day: day,
                        activity_id: activity_id,
                      })
                    : onSubmitCreate({
                        day: day,
                        activity_id: activity_id,
                      })
                  : isDayActivity(day)?.id !== undefined &&
                    isDayActivity(day)?.is_done !== undefined &&
                    onSubmitUpdate({
                      id: isDayActivity(day)?.id!,
                      is_done: isDayActivity(day)?.is_done!,
                      activity_id: activity_id,
                    })
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
