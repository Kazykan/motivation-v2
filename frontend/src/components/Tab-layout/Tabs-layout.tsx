import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Weekdays } from "../Activity/calenar"
import { useChildQuery } from "@/hooks/useChildQuery"
import { useTgUser } from "@/store/tg_user"
import { useChild } from "@/store/user"
import { useWeek } from "@/store/week"
import { useMemo, useState } from "react"
import { useActivityQuery } from "@/hooks/useActivityQuery"
import { useActivitySumDone } from "@/hooks/useActivitySumDone"
import { Switch } from "../ui/switch"
import { useSwitchEdit } from "@/store/switch_edit"
import { DialogAddActivity } from "../form/dialog-add-activity"
import { PaginationWeeks } from "./Paginator-week"

export function TabsLayout() {
  const setChildId = useChild((state) => state.setChildId)
  const startOfDate = useWeek((state) => state.start_of_date)
  const endOfWeek = useWeek((state) => state.end_of_week)
  const currentWeek = useWeek((state) => state.current_week)
  const isSwitch = useSwitchEdit((state) => state.isEdit)
  const setIsSwitch = useSwitchEdit((state) => state.setIsEdit)
  const setStartOfWeek = useWeek((state) => state.setStartOfWeek)
  const setEndOfWeek = useWeek((state) => state.setEndOfWeek)
  const tgUserId = useTgUser((state) => state.tgUserId)

  const child = useChildQuery(tgUserId, !!tgUserId)
  // Получаем id ребенка, если он есть, и сохраняем его
  if (child?.data !== null && child?.data !== undefined && child) {
    setChildId(child.data.id)
  }

  const activities = useActivityQuery(child?.data?.id)

  const sumActivitiesDays = useActivitySumDone(
    child?.data?.id,
    startOfDate,
    endOfWeek
  )

  const sumAllActivitiesCost = useMemo(() => {
    console.log(`sumAllActivitiesCost`)
    return (
      activities.data?.reduce((sum, activity) => sum + activity.cost, 0) || 0
    )
  }, [activities.data])

  const weekDataStart = useMemo(
    () => setStartOfWeek(currentWeek),
    [currentWeek]
  )

  const weekDataEnd = useMemo(() => setEndOfWeek(currentWeek), [currentWeek])

  return (
    <Tabs defaultValue="account" className="w-full px-5">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Дети</TabsTrigger>
        <TabsTrigger value="Свойство">Вопросы</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{child?.data?.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isSwitch}
                  onCheckedChange={() => setIsSwitch()}
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
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Свойство">
        <Card>
          <CardHeader>
            <CardTitle>Свойство</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
