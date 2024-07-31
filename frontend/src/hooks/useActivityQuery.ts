import { ActivityService } from "@/service/activity.service"
import { ActivityChangeProps, IActivitiesPatch } from "@/store/types"
import { useChild } from "@/store/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const useActivityQuery = (child_id: number | null | undefined) => {
  return useQuery({
    queryFn: () => ActivityService.get(child_id),
    queryKey: ["activities", child_id],
    enabled: child_id !== null && child_id !== undefined,
  })
}

export { useActivityQuery }

export function useOneActivityQuery(activity_id: number) {
  return useQuery({
    queryFn: () => ActivityService.getOne(activity_id),
    queryKey: ["activity_one", activity_id],
    enabled: activity_id !== null && activity_id !== null,
  })
}

export function useDeleteActivity({
  activity_id,
  setIsOpen,
}: ActivityChangeProps) {
  const childId = useChild((set) => set.ChildId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (activity_id: number) => ActivityService.delete(activity_id),
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

export function usePatchActivity({activity_id, setIsOpen }: ActivityChangeProps) {
  console.log("usePatchActivity")
  const childId = useChild((set) => set.ChildId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: IActivitiesPatch) => await ActivityService.patch(data),
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
