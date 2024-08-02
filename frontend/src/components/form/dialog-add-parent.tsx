import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "lucide-react"
import { ParentForm } from "./dialog-add-parent-form"

export function DialogAddParent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-foreground">
          {" "}
          <User size={20} />
          Родитель
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Регистрация родителя
          </DialogTitle>
          <DialogDescription>
            Создание пользователя для начала работы.
          </DialogDescription>
        </DialogHeader>
        <ParentForm />
      </DialogContent>
    </Dialog>
  )
}
