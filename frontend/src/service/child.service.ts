import { ChildCreateSchema, ChildSchema } from "@/store/types"
import { axiosInstance } from "./api"
import { z } from "zod"

export const ChildService = {
  async getChild(bot_user_id: number | null) {
    if (bot_user_id === null) {
      return null
    }
    console.log(`bot_user_id - ${bot_user_id}`)
    const response = await axiosInstance.get<z.infer<typeof ChildSchema>>(
      `children/?bot_user_id=${bot_user_id}`
    )
    return response.data
  },

  async create(data: z.infer<typeof ChildCreateSchema>) {
    console.log(`data load`)
    const response = await axiosInstance.post<z.infer<typeof ChildCreateSchema>>(
      `children/`,
      data
    )
    console.log(ChildSchema.parse(response.data))
    return ChildSchema.parse(response.data)
  },
}
