import { ChildService } from "@/service/child.service"
import { useQuery } from "@tanstack/react-query"

const useChildQuery = (bot_user_id: number | null, status: boolean) => {
  return useQuery({
    queryFn: async () => await ChildService.get_by_bot_user_id(bot_user_id),
    queryKey: ["child", bot_user_id],
    enabled: status
  })
}

export { useChildQuery }


