import { IActivities } from "@/store/types"
import { axiosInstance } from "./api"
import { ConvertDate } from "./date"

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
}
