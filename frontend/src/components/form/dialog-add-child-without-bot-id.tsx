import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Baby } from "lucide-react"
import { ChildFormWithoutBotId } from "./dialog-add-child-without-bot-id-form"

export function DialogAddChildWithoutBotId() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-foreground">
          {" "}
          <Baby size={20} /> Добавить ребёнка
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Регистрация ребёнка
          </DialogTitle>
          <DialogDescription>
            Создание ребенка для начала работы.
          </DialogDescription>
        </DialogHeader>
        <ChildFormWithoutBotId />
      </DialogContent>
    </Dialog>
  )
}
