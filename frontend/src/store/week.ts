import { WeekDay } from "@/service/date"
import { start } from "repl"
import { create } from "zustand"

interface WeekState {
  current_week: Date | undefined
  start_of_date: Date | null
  end_of_week: Date | null
  setCurrentWeek: (week_day: Date | undefined) => void
  setStartOfWeek: (current_week: Date | undefined) => void
  setEndOfWeek: (current_week: Date | undefined) => void
}

export const useWeek = create<WeekState>((set) => ({
  current_week: undefined,
  start_of_date: null,
  end_of_week: null,

  setCurrentWeek: (current_week: Date | undefined) =>
    set({ start_of_date: current_week }),

  setStartOfWeek: async (current_week: Date | undefined) => {
    if (current_week === undefined) {
      const thisWeek = await WeekDay.get_this_week()
      set({ start_of_date: thisWeek })
    } else {
      const thisWeek = await WeekDay.get_this_week(current_week)
      set({ start_of_date: thisWeek })
    }
  },

  setEndOfWeek: async (current_week: Date | undefined) => {
    if (current_week === undefined) {
      const thisWeek = await WeekDay.get_this_week(undefined, false)
      set({ end_of_week: thisWeek })
    } else {
      const thisWeek = await WeekDay.get_this_week(current_week, false)
      set({ end_of_week: thisWeek })
    }
  },
}))
