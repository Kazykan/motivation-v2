import { ActivityService } from "@/service/activity.service"
import { IActivitiesDay, IActivitiesWithWeek } from "@/store/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const useActivityQuery = (child_id: number | null | undefined) => {
  return useQuery({
    queryFn: () => ActivityService.get(child_id),
    queryKey: ["activities", child_id],
    enabled: child_id !== null && child_id !== undefined,
  })
}

export { useActivityQuery }

export function useDeleteMTMActivityWeek() {
  console.log("useDeleteMTMActivityWeek")
  return useMutation({
    mutationFn: (data: Omit<IActivitiesDay, "is_done">) =>
      ActivityService.delete_mtm_week(data),
  })
}

export function useAddMTMActivityWeek() {
  console.log("useAddMTMActivityWeek")
  return useMutation({
    mutationFn: (data: Omit<IActivitiesDay, "id" | "is_done">) =>
      ActivityService.add_mtm_week(data),
  })
}
