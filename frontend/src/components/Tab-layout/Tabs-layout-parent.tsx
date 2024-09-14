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
import { useParentBotUserIdQuery } from "@/hooks/useParentQuery"
import { useTgUser } from "@/store/tg_user"
import { DialogAddChildWithoutBotId } from "../form/dialog-add-child-without-bot-id"
import { useParent } from "@/store/parent"
import { ChildSelect } from "@/widgets/ChildSelect"
import { TableChildSum } from "@/widgets/TableChildSum"

export function TabsLayoutParent() {
  const setChildId = useChild((state) => state.setChildId)
  const tgParentId = useTgUser((state) => state.tgParentId)
  const setPatentId = useParent((state) => state.setParentId)
  const ChildId = useChild((state) => state.ChildId)

  const parent = useParentBotUserIdQuery(tgParentId, !!tgParentId)

  useEffect(() => {
    if (
      parent.data?.children !== undefined &&
      parent.data.children.length > 0
    ) {
      setChildId(parent.data.children[0].id)
    }
  }, [parent.data])

  useEffect(() => {
    if (parent.data?.id !== undefined) {
      setPatentId(parent.data.id)
    }
  }, [parent.data])

  return (
    <>
      {parent.data && (
        <Tabs defaultValue="child" className="w-full px-3">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="child">Ребенок</TabsTrigger>
            <TabsTrigger value="children">Дети</TabsTrigger>
            <TabsTrigger value="Свойство">Вопросы</TabsTrigger>
          </TabsList>
          <TabsContent value="child">
            <Card>
              {parent.data.children.length > 0 ? (
                <>
                  {parent.data.children.length > 1 && ChildId !== null ? (
                    <ChildTabContent>
                      <ChildSelect child_id={ChildId.toString()} />
                    </ChildTabContent>
                  ) : (
                    <ChildTabContent>{null}</ChildTabContent>
                  )}
                </>
              ) : (
                <div>нет детей</div>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="children">
            <Card>
              <CardContent className="space-y-2 mt-2">
                <div className="space-y-1">
                  <TableChildSum />
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
