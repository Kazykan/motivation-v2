import { IActivitiesDay, IActivitiesWithWeek } from "@/store/types"
import { axiosInstance } from "./api"
import { ConvertDate } from "./date"
import { create } from "domain"
import { getISODay } from "date-fns"

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

  async create(data: Omit<IActivitiesDay, "id" | "is_done">) {
    const response = await axiosInstance.post<IActivitiesDay>(
      `activity_days/`,
      { activity_id: data.activity_id, day: ConvertDate(data.day) }
    )
    return response.data
  },

  async update(data: Omit<IActivitiesDay, "day">) {
    console.log(`Updating activity day ${data.id} to ${data.is_done}`)
    const response = await axiosInstance.patch<IActivitiesDay>(
      `activity_days/${data.id}/`,
      {
        is_done: data.is_done,
      }
    )
    console.log(`response.data.is_done - ${response.data.is_done}`)
    return response.data
  },

  async post(data: Omit<IActivitiesDay, "is_done" | "id">) {
    console.log(`post activity day - ${ConvertDate(data.day)}`)
    const response = await axiosInstance.post<IActivitiesDay>(
      `activity_days/`,
      { day: ConvertDate(data.day), activity_id: data.activity_id }
    )
    return response.data
  },

  async delete(data: Omit<IActivitiesDay, "is_done">) {
    const response = await axiosInstance.delete(`activity_days/${data.id}/`)
    return response.data
  },
}
