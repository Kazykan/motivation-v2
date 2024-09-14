import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Activity } from "../Activity/calenar"
import { useChildByIdQuery } from "@/hooks/useChildQuery"
import { useTgUser } from "@/store/tg_user"
import { useChild } from "@/store/user"
import { useWeek } from "@/store/week"
import { useActivityQuery } from "@/hooks/useActivityQuery"
import { useSwitchEdit } from "@/store/switch_edit"
import { DialogAddActivity } from "../form/dialog-add-activity"
import { PaginationWeeks } from "./Paginator-week"
import { Switch } from "../ui/switch"
import { ChildSumActivityAll } from "@/widgets/ChildSumActivityAll"
import { ChildSumActivityDone } from "@/widgets/ChildSumActivityDone"

export function ChildTabContent({ children }: { children: React.ReactNode }) {
  const startOfDate = useWeek((state) => state.start_of_date)
  const endOfWeek = useWeek((state) => state.end_of_week)
  const isSwitch = useSwitchEdit((state) => state.isEdit)
  const setIsSwitch = useSwitchEdit((state) => state.setIsEdit)
  const setCurrentWeek = useWeek((state) => state.setCurrentWeek)
  const ChildId = useChild((state) => state.ChildId)
  const tgParentId = useTgUser((state) => state.tgParentId)
  const child = useChildByIdQuery(ChildId)
  const activities = useActivityQuery(child?.data?.id)

  return (
    <>
      <CardHeader>
        <div className="flex justify-between">
          {children ? children : <CardTitle>{child?.data?.name}</CardTitle>}
          {tgParentId && (
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
          )}
        </div>

        <CardDescription>
          Задания на неделю.
          <p>
            Итог:{" "}
            <span className="font-bold text-primary">
              <ChildSumActivityDone child_id={child.data?.id!} />
            </span>
            / <ChildSumActivityAll child_id={child.data?.id!} />
          </p>
          {startOfDate && endOfWeek && <PaginationWeeks />}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {startOfDate && endOfWeek && activities.data !== undefined && (
          <>
            {activities.data?.length > 0 &&
              activities.data?.map((activities) => (
                <div key={activities.id} className="space-y-1">
                  <Activity
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
