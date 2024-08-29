import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useParentIdQuery } from "@/hooks/useParentQuery"
import { useParent } from "@/store/parent"
import { ChildSumActivityDone } from "./ChildSumActivityDone"
     
  export function TableChildSumDone() {
    const parentId = useParent((state) => state.parentId)

    const parent = useParentIdQuery(parentId, !!parentId)

    return (
      <Table>
        <TableCaption>Ваши дети заработали на этой неделе</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ребенок</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Max sum</TableHead>
            <TableHead className="text-right">Заработал</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parent.data?.children.map((child) => (
            <TableRow key={child.id}>
              <TableCell className="font-medium">{child.name}</TableCell>
              <TableCell>{child.sex}</TableCell>
              <TableCell>{child.max_payout}</TableCell>
              <TableCell className="text-right"><ChildSumActivityDone child_id={child.id} /></TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    )
  }
  