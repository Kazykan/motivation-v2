import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useParentIdQuery } from "@/hooks/useParentQuery"
import { useParent } from "@/store/parent"
import { ChildSumActivityDone } from "./ChildSumActivityDone"
import { ChildSumActivityAll } from "./ChildSumActivityAll"
import { Gender } from "./Gender"

export function TableChildSum() {
  const parentId = useParent((state) => state.parentId)
  const parent = useParentIdQuery(parentId, !!parentId)

  return (
    <Table>
      <TableCaption>Ваши дети заработали на этой неделе</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ребенок</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead className="text-right">Заработано</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parent.data?.children.map((child) => (
          <TableRow key={child.id}>
            <TableCell className="font-medium">{child.name}</TableCell>
            <TableCell>
              <Gender sex={child.sex} />
            </TableCell>
            <TableCell className="text-right text-primary font-bold">
              <span className="text-muted-foreground font-normal"><ChildSumActivityAll child_id={child.id} />/</span><ChildSumActivityDone child_id={child.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
