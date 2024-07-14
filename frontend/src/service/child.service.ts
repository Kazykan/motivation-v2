import { ChildCreateSchema, ChildSchema } from "@/store/types"
import { axiosInstance } from "./api"
import { z } from "zod"

export const ChildService = {
  async get_by_bot_user_id(bot_user_id: number | null) {
    if (bot_user_id === null || bot_user_id === undefined) {
      return null
    }
    const response = await axiosInstance.get<z.infer<typeof ChildSchema>>(
      `children/?bot_user_id=${bot_user_id}`
    )
    return response.data
  },

  async create(data: z.infer<typeof ChildCreateSchema>) {
    const response = await axiosInstance.post<
      z.infer<typeof ChildCreateSchema>
    >(`children/`, data)
    return ChildSchema.parse(response.data)
  },
}
