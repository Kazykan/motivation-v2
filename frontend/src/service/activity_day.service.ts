import { IActivitiesDay } from "@/store/types"
import { axiosInstance } from "./api"
import { ConvertDate } from "./date"
import { create } from "domain"

export const ActivityDayService = {
  async get_period(
    activity_id: number | null,
    day_start: Date | null,
    day_end: Date | null
  ) {
    if (activity_id === null || day_start === null || day_end === null) {
      return undefined
    }
    const response = await axiosInstance.get<IActivitiesDay[]>(
      `activity_days/?activity_id=${activity_id}&day_start=${ConvertDate(
        day_start
      )}&day_end=${ConvertDate(day_end)}`
    )
    return response.data
  },

  async create(activity_day_id: number, day: Date) {
    const response = await axiosInstance.post<IActivitiesDay>(
      `activity_days/`,
      { activity_day_id, day: ConvertDate(day) }
    )
    return response.data
  },

  async update(activity_day_id: number, is_done: boolean) {
    const response = await axiosInstance.patch(`activity_days/${activity_day_id}/`, {
      is_done
    })
    return response.data
  }
}
