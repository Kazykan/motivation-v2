import { Check, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const week_days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const month_days = ["8", "9", "10", "11", "12", "13", "14"]
const temp_days = [0, 1, 1, 2, 0, 2, 3]

interface WeekdaysProps {
  days: number[]
}

export function Weekdays({ days }: WeekdaysProps) {
  return (
    <>
      <div className="flex bg-gray-50  justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-1  md:mx-12">
        {temp_days.map((day, index) => {
          return (
            <div key={index} className="flex group rounded-lg mx-1 cursor-pointer justify-center relative w-10 content-center">
              {day === 1 && (
                <Check className="rounded-xl bg-green-500 text-gray-100 flex h-6 w-5 absolute -top-1 -right-1" />
              )}
              {day === 2 && (
                <XIcon className="rounded-xl bg-red-500 text-gray-100 flex h-6 w-5 absolute -top-1 -right-1" />
              )}
              <div className="grid grid-cols-1 text-center w-10">
                <div
                  className={
                    (cn("flex mt-1 text-center rounded-lg px-1",
                    day === 1 && "bg-green-500",
                    day === 2 && "bg-red-500",
                    day === 3 && "bg-gray-500"))
                  }
                >
                  <div className="flex text-center mt-2 mx-1">
                    {week_days.at(index)}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-900  mt-2 font-bold">
                    {" "}
                    {month_days.at(index)}{" "}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* <div className="flex group rounded-lg mx-1 cursor-pointer justify-center relative w-10 content-center">
          <div className="grid grid-cols-1 text-center w-10">
            <div className="flex mt-1 text-center rounded-lg px-1">
              <div className="flex text-center mt-2 mx-1">Вт</div>
            </div>
            <div className="text-center">
              <p className="text-gray-900  mt-2 font-bold"> 12 </p>
            </div>
          </div>
        </div> */}

        {/* <div className="flex group rounded-lg mx-1 cursor-pointer justify-center relative w-10 content-center">
          <div className="grid grid-cols-1 text-center w-10">
            <div className="flex mt-1 text-center rounded-lg px-1">
              <div className="flex text-center mt-2 mx-1">Ср</div>
            </div>
            <div className="text-center">
              <p className="text-gray-900  mt-2 font-bold"> 13 </p>
            </div>
          </div>
        </div>

        <div className="flex group rounded-lg mx-1 cursor-pointer justify-center relative w-10 content-center">
          <Check className="rounded-xl bg-green-500 text-gray-100 flex h-6 w-5 absolute -top-1 -right-1" />
          <div className="grid grid-cols-1 text-center w-10">
            <div className="flex mt-1 bg-green-500 text-center rounded-lg px-1">
              <div className="flex text-center mt-2 mx-1">Чт</div>
            </div>
            <div className="text-center">
              <p className="text-gray-900  mt-2 font-bold"> 14 </p>
            </div>
          </div>
        </div>

        <div className="flex group rounded-lg mx-1 cursor-pointer justify-center relative w-10 content-center">
          <Check className="rounded-xl bg-green-500 text-gray-100 flex h-6 w-5 absolute -top-1 -right-1" />
          <div className="grid grid-cols-1 text-center w-10">
            <div className="flex mt-1 bg-green-500 text-center rounded-lg px-1">
              <div className="flex text-center mt-2 mx-1">Пт</div>
            </div>
            <div className="text-center">
              <p className="text-gray-900  mt-2 font-bold"> 15 </p>
            </div>
          </div>
        </div>

        <div className="flex group rounded-lg mx-1 cursor-pointer justify-center relative w-10 content-center">
          <XIcon className="rounded-xl bg-red-500 text-gray-100 flex h-6 w-5 absolute -top-1 -right-1" />
          <div className="grid grid-cols-1 text-center w-10">
            <div className="flex mt-1 bg-red-500 text-center rounded-lg px-1">
              <div className="flex text-center mt-2 mx-1">Сб</div>
            </div>
            <div className="text-center">
              <p className="text-gray-900  mt-2 font-bold"> 16 </p>
            </div>
          </div>
        </div> */}

        {/* <div className="flex group  rounded-lg mx-1 cursor-pointer justify-center relative w-10 content-center">
          <div className="grid grid-cols-1 text-center w-10">
            <div className="flex mt-1 bg-gray-500 text-center rounded-lg px-1">
              <div className="flex text-center mt-2 mx-1 text-gray-100">Вс</div>
            </div>
            <div className="text-center">
              <p className="text-gray-900  mt-2 font-bold"> 17 </p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}
