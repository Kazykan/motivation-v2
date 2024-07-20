import { useActivitySumDone } from "@/hooks/useActivitySumDone"
import { useWeek } from "@/store/week"

export function SumActivitiesDays(child_id: number) {
    const startOfDate = useWeek((state) => state.start_of_date)
    const endOfWeek = useWeek((state) => state.end_of_week)

    
    const sumActivitiesDays = useActivitySumDone(
        child_id,
        startOfDate,
        endOfWeek
      )

    return (
        <span>{sumActivitiesDays && sumActivitiesDays?.data}</span>
    )
}