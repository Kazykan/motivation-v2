import { IChild } from "@/store/types"
import { axiosInstance } from "./api"

export const ChildService = {
    async getChild(id: number) {
        const response = await axiosInstance.get<IChild>(``)
    }
}