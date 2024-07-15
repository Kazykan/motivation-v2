import { ActivityCreateSchema, IActivities, IActivitiesDay, IActivitiesWithWeek } from "@/store/types"
import { axiosInstance } from "./api"
import { ConvertDate } from "./date"
import { z } from "zod"
import { getISODay } from "date-fns"

export const ActivityService = {
  async get(child_id: number | undefined | null) {
    if (child_id === undefined || child_id === null) {
      return []
    }
    const response = await axiosInstance.get<IActivities[]>(
      `activities/?child_id=${child_id}`
    )
    return response.data
  },

  async sum_is_done(
    child_id: number | undefined | null,
    day_start: Date | null,
    day_end: Date | null
  ) {
    if (
      child_id === null ||
      day_start === null ||
      day_end === null ||
      child_id === undefined
    ) {
      return undefined
    }
    const response = await axiosInstance.get<number>(
        `activities/sum_is_done?day_start=${ConvertDate(day_start)}&day_end=${ConvertDate(day_end)}&child_id=${child_id}`
    )
    return response.data
  },

  async create(data: Omit<IActivities, "id">) {
    console.log(`ActivityService.create`)
    console.log(data)
    const response = await axiosInstance.post<Omit<IActivities, "id">>
    (`activities/`, data)
    return response.data
  },

  async delete_mtm_week(data: Omit<IActivitiesDay, "is_done">) {
    const day_week: number = getISODay(data.day)
    const delete_week_day = await axiosInstance.post<IActivitiesWithWeek>(
      `activities/add_week_day?activity_id=${data.activity_id}&week_id=${day_week}&add=${false}`
    )
    return delete_week_day.data
  },

  async add_mtm_week(data: Omit<IActivitiesDay, "id" | "is_done">) {
    const day_week: number = getISODay(data.day)
    const delete_week_day = await axiosInstance.post<IActivitiesWithWeek>(
      `activities/add_week_day?activity_id=${data.activity_id}&week_id=${day_week}&add=${true}`
    )
    return delete_week_day.data
  }
}
