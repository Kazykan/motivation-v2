import { ActivityDayService } from "@/service/activity_day.service"
import { useQuery } from "@tanstack/react-query"

const useActivityDayQuery = (
  activity_id: number,
  day_start: Date | null,
  day_end: Date | null
) => {
  return useQuery({
    queryFn: () =>
      ActivityDayService.get_period(activity_id, day_start, day_end),
    queryKey: ["activity_days", activity_id],
  })
}

export { useActivityDayQuery }
