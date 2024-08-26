import { useActivitySumDone } from "@/hooks/useActivitySumDone"
import { useWeek } from "@/store/week"

interface ChildProps {
  child_id: number
}

export function ChildSumActivityDone({ child_id }: ChildProps) {
  const startOfDate = useWeek((state) => state.start_of_date)
  const endOfWeek = useWeek((state) => state.end_of_week)
  const sum = useActivitySumDone(child_id, startOfDate, endOfWeek)

  return <div>Антон {sum.data}р.</div>
}
