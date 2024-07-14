import { ActivityDayService } from "@/service/activity_day.service"
import { IActivitiesDay } from "@/store/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface ActivityDayPromise {
  activity_id: number
  day_start: Date | null
  day_end: Date | null
}

const useActivityDayQuery = (
  activity_id: number,
  day_start: Date | null,
  day_end: Date | null
) => {
  return useQuery({
    queryFn: () =>
      ActivityDayService.get_period(activity_id, day_start, day_end),
    queryKey: ["activity_days", { activity_id: activity_id }],
    enabled: activity_id !== null && day_start !== null && day_end !== null,
  })
}

export { useActivityDayQuery }

export function useUpdateActivityDayCheck() {
  console.log("useActivityDayCheck")
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<IActivitiesDay, "day">) =>
      ActivityDayService.update(data),
    onSuccess: (data: Omit<IActivitiesDay, "day">) => {
      queryClient.invalidateQueries({
        queryKey: ["activity_days", { activity_id: data.activity_id }],
      })
      queryClient.invalidateQueries({
        queryKey: ["sum_done"],
      })
    },
  })
}
