import { IActivities } from "@/store/types"
import { axiosInstance } from "./api"

export const ActivityDayService = {
    async get(activity_id: number | null, day_start: Date | null, day_end: Date | null) {
        if (activity_id === null || day_start === null || day_end === null) {
            return null
        }
        const response = await axiosInstance.get<IActivities[]>(`activity_days/?activity_id=${activity_id}&day_start=${activity_id}&day_end=${activity_id}`)
        return response.data
    }
}