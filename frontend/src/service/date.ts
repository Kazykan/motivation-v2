import { startOfWeek, lastDayOfWeek, lightFormat } from "date-fns"

export const WeekDay = {
  get_this_week(this_day: Date | undefined = undefined, start: boolean = true) {
    let current_day: Date
    let start_of_week: Date
    let end_of_week: Date

    if (this_day === undefined) {
      current_day = new Date()
    } else {
      current_day = new Date(this_day)
    }

    start_of_week = startOfWeek(current_day, { weekStartsOn: 1 })
    end_of_week = lastDayOfWeek(current_day, { weekStartsOn: 1 })

    if (start) {
      return start_of_week
    } else {
      return end_of_week
    }
  },
}

export function ConvertDate(date: Date): string {
  const convertDate = lightFormat(date, "yyyy-MM-dd")
  return convertDate
}
