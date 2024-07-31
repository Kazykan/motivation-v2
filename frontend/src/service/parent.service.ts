import { IParentWithChildren, ParentCreateSchema } from "@/store/types"
import { axiosInstance } from "./api"
import { z } from "zod"

export const ParentService = {
    async get_by_bot_user_id(bot_user_id: number | null) {
        if (bot_user_id === null) {
            return null
        }
        const response = await axiosInstance.get<IParentWithChildren>(`parents/?bot_user_id=${bot_user_id}`)
        return response.data
    },

    async create(data: z.infer<typeof ParentCreateSchema>) {
        const response = await axiosInstance.post<
          z.infer<typeof ParentCreateSchema>
        >(`parents/`, data)
        return response.data
      },
}