import { ChildService } from "@/service/child.service"
import { ParentService } from "@/service/parent.service"
import { ChildCreateSchema, IChild, OpenDialogProps } from "@/store/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

const useChildByBotUserIdQuery = (
  bot_user_id: number | null,
  status: boolean
) => {
  return useQuery({
    queryFn: async () => await ChildService.get_by_bot_user_id(bot_user_id),
    queryKey: ["child", bot_user_id],
    enabled: status,
  })
}

const useChildByIdQuery = (id: number | null) => {
  return useQuery({
    queryFn: async () => await ChildService.get_by_id(id),
    queryKey: ["child_by_id", id],
    enabled: !!id,
  })
}

const useChildQueryPhoneNumber = (phone_number: string | undefined) => {
  return useQuery({
    queryFn: async () => await ChildService.get_by_phone_number(phone_number),
    queryKey: ["child_phone"],
    enabled: !!phone_number,
  })
}

export { useChildByBotUserIdQuery, useChildQueryPhoneNumber, useChildByIdQuery }

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

export function useChildByPhoneNumber() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (phone_number: string | undefined) =>
      ChildService.get_by_phone_number(phone_number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["child_phone"] })
    },
  })
}

export function useAddChildTelegramBotId({ setIsOpen }: OpenDialogProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Pick<IChild, "id" | "bot_user_id">) =>
      ChildService.patch_tg_bot_user_id(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["child"] }), setIsOpen(false)
      window.location.reload()
    },
  })
}
