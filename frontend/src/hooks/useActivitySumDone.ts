import { ActivityService } from "@/service/activity.service"
import { useQuery } from "@tanstack/react-query"

const useActivitySumDone = (child_id: number, day_start: Date | null, day_end: Date | null) => {
  return useQuery({
    queryFn: () => ActivityService.sum_is_done(child_id, day_start, day_end),
    queryKey: ["activities", "activity_days", child_id, day_start, day_end],
  })
}

export { useActivitySumDone }