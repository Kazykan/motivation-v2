import { DialogAddActivity } from "../form/dialog-add-activity";
import { DialogDeleteActivity } from "../form/dialog-delete-activity";
import { Button } from "../ui/button";

interface ActivityProps {
  activity_id: number
}

export function EditActivityButton({activity_id}: ActivityProps) {

    return (
        <>
        <Button variant="link">Ред.</Button>
        <DialogDeleteActivity activity_id={activity_id} />
      </>
    )

}