import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useParentBotUserIdQuery } from "@/hooks/useParentQuery"
import { useTgUser } from "@/store/tg_user"
import { useChild } from "@/store/user"
import { useEffect, useState } from "react"

export function ChildSelect({ child_id }: { child_id: string }) {
  //+
  const setChildId = useChild((state) => state.setChildId)
  const tgParentId = useTgUser((state) => state.tgParentId)
  const ChildId = useChild((state) => state.ChildId)

  const parent = useParentBotUserIdQuery(tgParentId, !!tgParentId)
  const [value, setValue] = useState(child_id.toString())

  useEffect(() => {
    setChildId(Number(value))
  }, [value])

  return (
    <>
      {parent.data !== undefined &&
      ChildId !== null &&
      parent.data !== null &&
      parent.data.children.length > 1 ? (
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[250px] mb-1">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {parent.data.children.map((child) => {
                return (
                  <SelectItem key={child.id} value={child.id.toString()}>
                    {child.name}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        "Error"
      )}
    </>
  )
}
