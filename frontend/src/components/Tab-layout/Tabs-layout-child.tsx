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
import { ChildTabContent } from "./Child-TabContent"
import { Switch } from "../ui/switch"
import { useSwitchEdit } from "@/store/switch_edit"
import { useWeek } from "@/store/week"

export function TabsLayoutChild() {
  const isSwitch = useSwitchEdit((state) => state.isEdit)
  const setIsSwitch = useSwitchEdit((state) => state.setIsEdit)
  const setCurrentWeek = useWeek((state) => state.setCurrentWeek)

  return (
    <Tabs defaultValue="child" className="w-full px-5">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="child">Выплаты</TabsTrigger>
        <TabsTrigger value="Свойство">Вопросы</TabsTrigger>
      </TabsList>
      <TabsContent value="child">
        <Card>
          <ChildTabContent>
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
          </ChildTabContent>
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
