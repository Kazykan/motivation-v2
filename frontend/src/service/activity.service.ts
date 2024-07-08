import { IActivities } from "@/store/types"
import { axiosInstance } from "./api"

export const ActivityService = {
    async get(child_id: number | undefined | null) {
        if (child_id === undefined || child_id === null) {
            return []
        }
        const response = await axiosInstance.get<IActivities[]>(`activities/?child_id=${child_id}`)
        console.log(response.data)
        return response.data
    }
}