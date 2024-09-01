import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationNextDisable,
  PaginationPrevious,
  PaginationPreviousDisable,
} from "@/components/ui/pagination"
import { ShortDate, WeekDay } from "@/service/date"
import { useSwitchEdit } from "@/store/switch_edit"
import { useWeek } from "@/store/week"
import { addDays } from "date-fns"

export function PaginationWeeks() {
  const startOfDate = useWeek((state) => state.start_of_date)
  const endOfWeek = useWeek((state) => state.end_of_week)
  const setCurrentWeek = useWeek(state => state.setCurrentWeek)
  const currentWeek = useWeek((state) => state.current_week)
  const isSwitch = useSwitchEdit((state) => state.isEdit)

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
    setCurrentWeek(nextWeek)
  }

  const isNextWeek = WeekDay.comparison_current_date(currentWeek)


  return (
    <Pagination className="mt-3">
      <PaginationContent>
        {isSwitch ? 
        <PaginationItem>
        <PaginationPreviousDisable />
      </PaginationItem>
        :
        <PaginationItem>
          <PaginationPrevious onClick={() => setCurrentDay(false)} href="#" />
        </PaginationItem>
      }
        <PaginationItem>
          {startOfDate &&
            endOfWeek &&
            `${ShortDate(startOfDate)} - ${ShortDate(endOfWeek)}`}
        </PaginationItem>
        {isNextWeek ? (
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
