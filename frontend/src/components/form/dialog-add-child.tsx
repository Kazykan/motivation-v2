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
import { ChildForm } from "./dialog-add-child-form"
import { Baby } from "lucide-react"

export function DialogAddChild() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-foreground">
          {" "}
          <Baby size={20} /> Ребёнок
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Регистрация ребёнка
          </DialogTitle>
          <DialogDescription>
            Создание пользователя для начала работы.
          </DialogDescription>
        </DialogHeader>
        <ChildForm />
      </DialogContent>
    </Dialog>
  )
}
