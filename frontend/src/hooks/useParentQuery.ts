import { ParentService } from "@/service/parent.service"
import { ParentCreateSchema } from "@/store/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

const useParentQuery = (bot_user_id: number | null, status: boolean) => {
  return useQuery({
    queryFn: async () => await ParentService.get_by_bot_user_id(bot_user_id),
    queryKey: ["parent", bot_user_id],
    enabled: status
  })
}

export { useParentQuery }

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
