import { ActivityDayService } from "@/service/activity_day.service"
import { IActivitiesDay } from "@/store/types"
import { useWeek } from "@/store/week"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// const startOfDate = useWeek((state) => state.start_of_date)
// const endOfWeek = useWeek((state) => state.end_of_week)

const useActivityDayQuery = (
  activity_id: number,
  day_start: Date | null,
  day_end: Date | null
) => {
  return useQuery({
    queryFn: () =>
      ActivityDayService.get_period(activity_id, day_start, day_end),
    queryKey: [
      "activity_days",
      { activity_id: activity_id, day_start: day_start, day_end: day_end },
    ],
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

export function useCreateActivityDay() {
  console.log("useActivityDayCheck")
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<IActivitiesDay, "id" | "is_done">) =>
      ActivityDayService.create(data),
    onSuccess: (data: IActivitiesDay) => {
      queryClient.invalidateQueries({
        queryKey: ["activity_days", { activity_id: data.activity_id }],
      })
      queryClient.invalidateQueries({
        queryKey: ["sum_done"],
      })
    },
  })
}

export function useDeleteActivityDay(activity_id: number) {
  console.log("useActivityDayCheck")
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<IActivitiesDay, "is_done">) =>
      ActivityDayService.delete(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activity_days", { activity_id: activity_id }],
      })
      queryClient.invalidateQueries({
        queryKey: ["sum_done"],
      })
    },
  })
}
