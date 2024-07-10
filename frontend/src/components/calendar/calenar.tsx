import { Check, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { useWeek } from "@/store/week"
import { useActivityDayQuery } from "@/hooks/useActivityDayQuery"
import { useMemo } from "react"
import { isSameDay } from "date-fns"

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
    if (week_days_by_activity.data === undefined || week_days_by_activity.data?.length === 0) {
      return 0
    } else {
      quantity_days = week_days_by_activity.data.length
      days_is_done = week_days_by_activity.data.filter(day => day.is_done).length
      total_cost = quantity_days === days_is_done ? cost : Math.ceil(cost / quantity_days * days_is_done)
    }
    console.log(total_cost)
    return total_cost
  }
  

  if (week_days_by_activity.data === undefined) {
    return <div>Нет заданий</div>
  }

  return (
    <>
      <Label htmlFor="name">{activity_name} {sum_cost()}р. / {cost}р.</Label>
      <div className="flex bg-gray-50  justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-1  md:mx-12">
        {week_days_by_activity.data.length > 0 &&
          current_week_days !== undefined &&
          current_week_days.map((day: Date, index: number) => (
            <div
              key={index}
              className="flex group rounded-lg mx-1 cursor-pointer justify-center relative w-10 content-center"
              onClick= {() => console.log(day)}
            >
              {isDayActivity(day) && (
                <div>
                  {isDayActivity(day)?.is_done ? (
                    <Check className="rounded-xl bg-green-500 text-gray-100 flex h-6 w-5 absolute -top-1 -right-1" />
                  ) : (
                    <XIcon className="rounded-xl bg-red-500 text-gray-100 flex h-6 w-5 absolute -top-1 -right-1" />
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 text-center w-10">
                {isDayActivity(day) ? (
                  <div
                    className={cn(
                      "flex mt-1 text-center rounded-lg px-1",
                      isDayActivity(day)?.is_done
                        ? "bg-green-500"
                        : "bg-red-500"
                    )}
                  >
                    <div className="flex text-center mt-2 mx-1">
                      {week_days.at(index)}
                    </div>
                  </div>
                ) : (
                  <div className="flex mt-1 text-center rounded-lg px-1">
                    <div className="flex text-center mt-2 mx-1">
                      {week_days.at(index)}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-gray-900  mt-2 font-bold">
                    {" "}
                    {day.getDate()}{" "}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
