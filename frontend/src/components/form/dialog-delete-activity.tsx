import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DeleteActivityForm } from "./dialog-delete-activity-form"
import { useState } from "react"

interface ActivityProps {
  activity_id: number
}

export function DialogDeleteActivity({activity_id}: ActivityProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          Удалить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-black/70 dark:text-white/65">Удалить задние</DialogTitle>
          <DialogDescription className="text-destructive">
            Удалить задние для ребенка. Все задания выполненные по ней в предыдущих и текущей неделе будут удаленны!
          </DialogDescription>
        </DialogHeader>
        <DeleteActivityForm activity_id={activity_id} setIsOpen={setIsOpen}/>
      </DialogContent>
    </Dialog>
  )
}
