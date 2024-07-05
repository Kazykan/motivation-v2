import { IParent } from "@/store/types"
import { axiosInstance } from "./api"

export const ChildService = {
    async getChild(bot_user_id: number | null) {
        if (bot_user_id === null) {
            return null
        }
        const response = await axiosInstance.get<IParent>(`children/?bot_user_id=${bot_user_id}`)
        return response.data
    }
}