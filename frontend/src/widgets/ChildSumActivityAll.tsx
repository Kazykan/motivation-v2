import { useActivityQuery } from "@/hooks/useActivityQuery"
import currencyFormatMoney from "@/service/current.format.money"
import { useMemo } from "react"

interface ChildProps {
  child_id: number
}

export function ChildSumActivityAll({ child_id }: ChildProps) {
  const activities = useActivityQuery(child_id)

  const sumAllActivitiesCost = useMemo(() => {
    return (
      activities.data?.reduce((sum, activity) => sum + activity.cost, 0) || 0
    )
  }, [activities.data])

  return <>{currencyFormatMoney(sumAllActivitiesCost)}</>
}
