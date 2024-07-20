import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationNextDisable,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ShortDate } from "@/service/date"
import { useWeek } from "@/store/week"
import { addDays } from "date-fns"
import { useState } from "react"

export function PaginationWeeks() {
  const [isNext, setIsNext] = useState<boolean>(true)
  const startOfDate = useWeek((state) => state.start_of_date)
  const endOfWeek = useWeek((state) => state.end_of_week)
  const setCurrentWeek = useWeek(state => state.setCurrentWeek)
  const currentWeek = useWeek((state) => state.current_week)

  function setCurrentDay(set: boolean) {
    let day: Date
    let nextWeek: Date
    if (currentWeek === undefined ) {
        day = new Date
    } else {
        day = currentWeek
    }
    
    if (set) {
        nextWeek = addDays(day, 7)
    } else {
        nextWeek = addDays(day, -7)
    }
    console.log(nextWeek)
    setCurrentWeek(nextWeek)
  }




  return (
    <Pagination className="mt-3">
      <PaginationContent>
        <PaginationItem className="disaple">
          <PaginationPrevious onClick={() => setCurrentDay(false)} href="#" />
        </PaginationItem>
        <PaginationItem>
          {startOfDate &&
            endOfWeek &&
            `${ShortDate(startOfDate)} - ${ShortDate(endOfWeek)}`}
        </PaginationItem>
        {currentWeek!.getTime() < endOfWeek!.getTime() ? (
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentDay(true)} href="#" />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationNextDisable />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
