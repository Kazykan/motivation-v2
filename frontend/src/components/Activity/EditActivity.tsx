import { DialogAddActivity } from "../form/dialog-add-activity";
import { DialogDeleteActivity } from "../form/dialog-delete-activity";
import { DialogPatchActivity } from "../form/dialog-patch-activity";
import { Button } from "../ui/button";

interface ActivityProps {
  activity_id: number
}

export function EditActivityButton({activity_id}: ActivityProps) {

    return (
        <>
        <DialogPatchActivity activity_id={activity_id} />
        <DialogDeleteActivity activity_id={activity_id} />
      </>
    )

}