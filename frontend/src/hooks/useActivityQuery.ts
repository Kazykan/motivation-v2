import { ActivityService } from "@/service/activity.service"
import { useQuery } from "@tanstack/react-query"

const useActivityQuery = (child_id: number) => {
  return useQuery({
    queryFn: () => ActivityService.get(child_id),
    queryKey: ["activities", child_id],
  })
}

export { useActivityQuery }