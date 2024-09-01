import currencyFormatMoney from "@/service/current.format.money"
import { IActivitiesDay } from "@/store/types"

interface SumCostProps {
    week_days_by_activity: IActivitiesDay[] | undefined
    cost: number
  
}
  
  export function SumCost({week_days_by_activity, cost}: SumCostProps) {
    let quantity_days: number = 0
    let days_is_done: number = 0
    let total_cost: number = cost
    if (
      week_days_by_activity! === undefined ||
      week_days_by_activity?.length === 0
    ) {
      return 0
    } else {
      quantity_days = week_days_by_activity!.length
      days_is_done = week_days_by_activity!.filter(
        (day) => day.is_done
      ).length
      total_cost =
        quantity_days === days_is_done
          ? cost
          : Math.ceil((cost / quantity_days) * days_is_done)
    }
    return currencyFormatMoney(total_cost)
  }