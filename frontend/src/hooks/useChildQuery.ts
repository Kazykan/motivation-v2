import { ChildService } from "@/service/child.service"
import { ChildCreateSchema } from "@/store/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

const useChildQuery = (bot_user_id: number | null, status: boolean) => {
  return useQuery({
    queryFn: async () => await ChildService.get_by_bot_user_id(bot_user_id),
    queryKey: ["child", bot_user_id],
    enabled: status,
  })
}

const useChildQueryPhoneNumber = (phone_number: string) => {
  return useQuery({
    queryFn: async () => await ChildService.get_by_phone_number(phone_number),
    queryKey: ["child_phone", phone_number]
  })
}

export { useChildQuery, useChildQueryPhoneNumber }

export function useAddChild() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof ChildCreateSchema>) =>
      ChildService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["child"] })
      window.location.reload()
    },
  })
}
