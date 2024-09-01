import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { ActivityForm } from "./dialog-add-activity-form"
import { useState } from "react"

export function DialogAddActivity() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-5 w-5" />
          Добавить задние
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">Добавить задание</DialogTitle>
          <DialogDescription className="text-muted-foreground">Добавить задние для ребенка.</DialogDescription>
        </DialogHeader>
        <ActivityForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
