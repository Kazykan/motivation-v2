import { useWeek } from "@/store/week"

// const currentWeek = useWeek((state) => state.current_week)
// const startOfDate = useWeek((state) => state.start_of_date)
// const endOfWeek = useWeek((state) => state.end_of_week)
// const setCurrentWeek = useWeek((state) => state.setCurrentWeek)

export const WeekDay = {
  async get_this_week(
    this_day: Date | undefined = undefined,
    start: boolean = true
  ) {
    let current_day: Date
    let start_of_week: Date
    let end_of_week: Date

    if (this_day === undefined) {
      current_day = new Date()
    } else {
      current_day = new Date(this_day)
    }

    const week_day = current_day.getDay() + 1
    // Если сегодня воскресенье, то начало недели с понедельника
    if (week_day === 1) {
      start_of_week = new Date(new Date().setDate(current_day.getDate() - 6))
      end_of_week = current_day
    } else {
      start_of_week = new Date(
        new Date().setDate(week_day - current_day.getDate())
      )
      end_of_week = new Date(new Date().setDate(start_of_week.getDate() + 6))
    }

    console.log(start_of_week, end_of_week)
    if (start) {
      return start_of_week
    } else {
      return end_of_week
    }
  },
}
