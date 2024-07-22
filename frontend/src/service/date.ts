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

  comparison_current_date(currentWeek: Date | undefined): boolean {
    if (currentWeek === undefined) {
      return false
    } else {
      const current_week_day = currentWeek.setHours(0, 0, 0, 0)
      const this_day = new Date().setHours(0, 0, 0, 0)
      if (current_week_day === this_day) {
        return false
      } else return true
    }
  },
}

export function ConvertDate(date: Date): string {
  const convertDate = lightFormat(date, "yyyy-MM-dd")
  return convertDate
}

export function ShortDate(date: Date): string {
  const shortDate = `${date.getDate()} ${date
    .toLocaleDateString("ru", { month: "short" })
    .substring(0, 3)}`
  return shortDate
}
