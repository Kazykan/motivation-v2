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
import { useMemo } from "react"
import { useActivityQuery } from "@/hooks/useActivityQuery"
import { useActivitySumDone } from "@/hooks/useActivitySumDone"
import { Switch } from "../ui/switch"
import { useSwitchEdit } from "@/store/switch_edit"
import { DialogAddActivity } from "../form/dialog-add-activity"
import { PaginationWeeks } from "./Paginator-week"
import { ChildTabContent } from "./Child-TabContent"

export function TabsLayoutParent() {
  const setChildId = useChild((state) => state.setChildId)
  const currentWeek = useWeek((state) => state.current_week)
  const setStartOfWeek = useWeek((state) => state.setStartOfWeek)
  const setEndOfWeek = useWeek((state) => state.setEndOfWeek)

  const weekDataStart = useMemo(
    () => setStartOfWeek(currentWeek),
    [currentWeek]
  )

  const weekDataEnd = useMemo(() => setEndOfWeek(currentWeek), [currentWeek])

  return (
    <Tabs defaultValue="child" className="w-full px-5">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="child">Ребенок</TabsTrigger>
        <TabsTrigger value="children">Дети</TabsTrigger>
        <TabsTrigger value="Свойство">Вопросы</TabsTrigger>
      </TabsList>
      <TabsContent value="child">
        <Card>
          <ChildTabContent />
        </Card>
      </TabsContent>
      <TabsContent value="children">
        <Card>
          <CardHeader>
            <CardTitle>Дети</CardTitle>
            <CardDescription>
              Ваши дети заработали на этой неделе.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div>Rufat 325 р.</div>
              <div>Медина 125 р.</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Добавить ребенка</Button>
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