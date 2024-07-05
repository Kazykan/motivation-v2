import { ChildService } from "@/service/child.service"
import { useQuery } from "@tanstack/react-query"

const useChildQuery = (bot_user_id: number) => {
  return useQuery({
    queryFn: () => ChildService.get_by_bot_user_id(bot_user_id),
    queryKey: ["child", bot_user_id],
  })
}

export { useChildQuery }
