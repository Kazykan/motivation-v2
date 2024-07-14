import { ActivityService } from "@/service/activity.service"
import { useQuery } from "@tanstack/react-query"

const useActivityQuery = (child_id: number | null | undefined) => {
  return useQuery({
    queryFn: () => ActivityService.get(child_id),
    queryKey: ["activities", child_id],
    enabled: child_id !== null && child_id !== undefined,
  })
}

export { useActivityQuery }