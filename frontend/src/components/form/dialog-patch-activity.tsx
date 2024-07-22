import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { ActivityPatchForm } from "./dialog-patch-activity-form"

interface ActivityProps {
  activity_id: number
}


export function DialogPatchActivity({activity_id}: ActivityProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Ред.</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Редактировать задание
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Редактировать задние для ребенка.
          </DialogDescription>
        </DialogHeader>
        <ActivityPatchForm activity_id={activity_id} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
