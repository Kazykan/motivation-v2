import { ActivityService } from "@/service/activity.service"
import { useQuery } from "@tanstack/react-query"

const useActivitySumDone = (child_id: number | null | undefined, day_start: Date | null, day_end: Date | null) => {

  return useQuery({
    queryFn: async () => await ActivityService.sum_is_done(child_id, day_start, day_end),
    queryKey: ["sum_done", {day_start: day_start, day_end: day_end}],
    enabled: child_id!== null && child_id!== undefined && day_start!== null && day_start!== undefined && day_end!== null && day_end!== undefined,
  })
}

export { useActivitySumDone }