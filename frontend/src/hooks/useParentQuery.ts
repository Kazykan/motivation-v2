import { ParentService } from "@/service/parent.service"
import { useTgUser } from "@/store/tg_user"
import {
  ChildParentIdsProps,
  OpenDialogProps,
  ParentCreateSchema,
} from "@/store/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

const useParentBotUserIdQuery = (bot_user_id: number | null, status: boolean) => {
  return useQuery({
    queryFn: async () => await ParentService.get_by_bot_user_id(bot_user_id),
    queryKey: ["parent", bot_user_id],
    enabled: status,
  })
}

const useParentIdQuery = (id: number | null, status: boolean) => {
  return useQuery({
    queryFn: async () => await ParentService.get_by_id(id),
    queryKey: ["parent_id", id],
    enabled: status,
  })
}

export { useParentBotUserIdQuery, useParentIdQuery }

export function useAddParent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof ParentCreateSchema>) =>
      ParentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parent"] })
      window.location.reload()
    },
  })
}

export function useAddParentChildRelationship({ setIsOpen }: OpenDialogProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ChildParentIdsProps) =>
      ParentService.addParenChildRelationship(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parent"] }), setIsOpen(false)
    },
    onError: () => {
      console.log(`Error`)
    },
  })
}
