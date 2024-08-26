import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Weekdays } from "../Activity/calenar"
import { useChildByBotUserIdQuery, useChildByIdQuery } from "@/hooks/useChildQuery"
import { useTgUser } from "@/store/tg_user"
import { useChild } from "@/store/user"
import { useWeek } from "@/store/week"
import { useEffect, useMemo } from "react"
import { useActivityQuery } from "@/hooks/useActivityQuery"
import { useActivitySumDone } from "@/hooks/useActivitySumDone"
import { Switch } from "../ui/switch"
import { useSwitchEdit } from "@/store/switch_edit"
import { DialogAddActivity } from "../form/dialog-add-activity"
import { PaginationWeeks } from "./Paginator-week"

export function ChildTabContent() {
  const startOfDate = useWeek((state) => state.start_of_date)
  const endOfWeek = useWeek((state) => state.end_of_week)
  const isSwitch = useSwitchEdit((state) => state.isEdit)
  const setIsSwitch = useSwitchEdit((state) => state.setIsEdit)
  const setCurrentWeek = useWeek((state) => state.setCurrentWeek)
  const ChildId = useChild((state) => state.ChildId)

  const child = useChildByIdQuery(ChildId)

  console.log(child.data)
  // const child = useChildByBotUserIdQuery(ChildBotUserId, !!ChildBotUserId)

  // // Получаем id ребенка, если он есть, и сохраняем его
  // useEffect(() => {
  //   if (child?.data !== null && child?.data !== undefined && child) {
  //     setChildId(child.data.id)
  //   }
  // }, [child.data])

  const activities = useActivityQuery(child?.data?.id)

  const sumActivitiesDays = useActivitySumDone(
    child?.data?.id,
    startOfDate,
    endOfWeek
  )

  const sumAllActivitiesCost = useMemo(() => {
    return (
      activities.data?.reduce((sum, activity) => sum + activity.cost, 0) || 0
    )
  }, [activities.data])

  return (
    <>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{child?.data?.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isSwitch}
              onCheckedChange={() => {
                setIsSwitch()
                setCurrentWeek(undefined)
              }}
            />
            <Label>Вкл. редак.</Label>
          </div>
        </div>
        <CardDescription>
          Задания на неделю. Итог:{" "}
          {sumActivitiesDays && sumActivitiesDays?.data}р./
          {sumAllActivitiesCost}р.
          {startOfDate && endOfWeek && <PaginationWeeks />}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {startOfDate && endOfWeek && activities.data !== undefined && (
          <>
            {activities.data?.length > 0 &&
              activities.data?.map((activities) => (
                <div key={activities.id} className="space-y-1">
                  <Weekdays
                    activity_id={activities.id}
                    cost={activities.cost}
                    activity_name={activities.name}
                  />
                </div>
              ))}
          </>
        )}
      </CardContent>
      {(activities.data?.length == 0 || isSwitch) && (
        <CardFooter>
          <DialogAddActivity />
        </CardFooter>
      )}
    </>
  )
}
