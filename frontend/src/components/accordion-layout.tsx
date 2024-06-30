import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ToggleGroupWeek } from "./togle-group-multiple-sm"

export function AccordionActivity() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div>Танцы</div>
          <div>150 руб.</div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-between">
            <ToggleGroupWeek Tu={true} Th={true} Fr={true} Su={true} />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div>Дуолинго</div>
          <div>50 руб.</div>
        </AccordionTrigger>
        <AccordionContent>
          <ToggleGroupWeek Mo={true} We={true} Fr={true} Su={true} />
          36 руб.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Уборка</AccordionTrigger>
        <AccordionContent>
          <ToggleGroupWeek Tu={true} Th={true} Fr={true} Su={true} />
          23 руб.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
