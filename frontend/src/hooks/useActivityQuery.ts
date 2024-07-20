import { ActivityService } from "@/service/activity.service"
import { ActivityDeleteProps } from "@/store/types"
import { useChild } from "@/store/user"
import { useWeek } from "@/store/week"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// const startOfDate = useWeek((state) => state.start_of_date)
// const endOfWeek = useWeek((state) => state.end_of_week)

const useActivityQuery = (child_id: number | null | undefined) => {
  return useQuery({
    queryFn: () => ActivityService.get(child_id),
    queryKey: ["activities", child_id],
    enabled: child_id !== null && child_id !== undefined,
  })
}

export { useActivityQuery }


export function useDeleteActivity({activity_id, setIsOpen}: ActivityDeleteProps) {
  console.log("useDeleteActivity")
  const childId = useChild((set) => set.ChildId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (activity_id: number) =>
      ActivityService.delete(activity_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activity_days", { activity_id: activity_id }],
      })
      queryClient.invalidateQueries({
        queryKey: ["sum_done"],
      })
      queryClient.invalidateQueries({
        queryKey: ["activities", childId],
      })
      setIsOpen(false)
    },
  })
}