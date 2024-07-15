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
import { ProfileForm } from "./dialog-add-user-form"

export function DialogAddUser() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Регистрация</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Регистрация</DialogTitle>
          <DialogDescription>
            Создание пользователя для начала работы.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  )
}
