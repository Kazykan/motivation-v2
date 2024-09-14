
interface ChildProps {
  sex: number
}

export function Gender({ sex }: ChildProps) {
  return <>
  {sex == 1 && <>♂</>}
  {sex == 2 && <>♀</>}
  </>
}
