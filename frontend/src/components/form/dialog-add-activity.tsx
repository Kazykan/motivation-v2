import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { ActivityForm } from "./dialog-add-activity-form"

export function DialogAddActivity() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2 h-5 w-5" />
          Добавить задние
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Добавить задание</DialogTitle>
          <DialogDescription>
            Добавить задние для ребенка.
          </DialogDescription>
        </DialogHeader>
        <ActivityForm />
      </DialogContent>
    </Dialog>
  )
}
