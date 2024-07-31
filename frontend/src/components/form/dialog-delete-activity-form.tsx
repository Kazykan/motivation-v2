import { Button } from "@/components/ui/button"
import { useDeleteActivity } from "@/hooks/useActivityQuery"
import { ActivityChangeProps } from "@/store/types"

export function DeleteActivityForm({
  activity_id,
  setIsOpen,
}: ActivityChangeProps) {
  const deleteActivity = useDeleteActivity({ activity_id, setIsOpen })

  function onSubmit() {
    deleteActivity.mutate(activity_id)
  }

  return (
    <>
      <div className="flex justify-center space-x-3">
        <Button variant="destructive" onClick={() => onSubmit()}>
          Удалить
        </Button>
        <Button onClick={() => setIsOpen(false)}>Отмена</Button>
      </div>
    </>
  )
}
