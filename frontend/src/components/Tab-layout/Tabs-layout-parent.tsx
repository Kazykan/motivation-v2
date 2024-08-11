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
import { useChild } from "@/store/user"
import { useEffect } from "react"
import { ChildTabContent } from "./Child-TabContent"
import { useParentQuery } from "@/hooks/useParentQuery"
import { useTgUser } from "@/store/tg_user"
import { useActivitySumDone } from "@/hooks/useActivitySumDone"
import { useWeek } from "@/store/week"
import { DialogAddChildWithoutBotId } from "../form/dialog-add-child-without-bot-id"

export function TabsLayoutParent() {
  const setChildId = useChild((state) => state.setChildId)
  const tgParentId = useTgUser((state) => state.tgParentId)
  const startOfDate = useWeek((state) => state.start_of_date)
  const endOfWeek = useWeek((state) => state.end_of_week)

  const parent = useParentQuery(tgParentId, !!tgParentId)

  useEffect(() => {
    if (
      parent.data?.children !== undefined &&
      parent.data.children.length > 0
    ) {
      setChildId(parent.data.children[0].id)
    }
  }, [parent.data])

  function sumActivitiesDays(child_id: number) {
    return useActivitySumDone(child_id, startOfDate, endOfWeek)
  }


  return (
    <>
      {parent.data && (
        <Tabs defaultValue="child" className="w-full px-5">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="child">Ребенок</TabsTrigger>
            <TabsTrigger value="children">Дети</TabsTrigger>
            <TabsTrigger value="Свойство">Вопросы</TabsTrigger>
          </TabsList>
          <TabsContent value="child">
            <Card>
              {parent.data.children.length > 0 ? (
                <div>Есть дети</div>
              ) : (
                <div>нет детей</div>
              )}

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
                  {parent.data?.children?.map((child) => (
                    <div
                      key={child.id}
                      className="text-2xl font-semibold text-foreground"
                    >
                      {child.name}{" "}
                      {sumActivitiesDays(child.id) &&
                        sumActivitiesDays(child.id).data}
                    </div>
                  ))}
                  <div>Rufat 325 р.</div>
                  <div>Медина 125 р.</div>
                </div>
              </CardContent>
              <CardFooter>
                <DialogAddChildWithoutBotId />
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
      )}
    </>
  )
}
