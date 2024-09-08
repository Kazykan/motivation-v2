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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

export function TabsLayoutChild() {
  return (
    <Tabs defaultValue="child" className="w-full px-3">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="child">Выплаты</TabsTrigger>
        <TabsTrigger value="Свойство">Вопросы</TabsTrigger>
      </TabsList>
      <TabsContent value="child">
        <Card>
          <ChildTabContent>{null}</ChildTabContent>
        </Card>
      </TabsContent>
      <TabsContent value="Свойство">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Как добавлять задания?</AccordionTrigger>
            <AccordionContent>
              Задания добавляют ваши родители.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Как считается сумма по выполненным заданиям?</AccordionTrigger>
            <AccordionContent>
              Если сумма равна например 10р. и 3 дня на его выполнения то 1 задание округляется в большую сторону и оно будет стоить 4р.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  )
}
