import { phoneRegex } from "@/service/phone.regex"
import { z } from "zod"

export const ChildSchema = z.object({
  id: z.number().nullable(),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z
    .string()
    .min(10, { message: "Номер телефона должен быть не менее 10 символ" })
    .max(12, { message: "Номер телефона должен быть не более 12 символов" })
    .regex(phoneRegex),
  sex: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  bot_user_id: z.number(),
  birthday: z.date().nullable(),
  max_payout: z.number().nullable(),
})

export const ChildCreateSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z
    .string()
    .min(10, { message: "Номер телефона должен быть не менее 10 символ" })
    .max(12, { message: "Номер телефона должен быть не более 12 символов" })
    .regex(phoneRegex),
  sex: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  bot_user_id: z.number().nullable(),
  birthday: z.date().nullable(),
  max_payout: z.number().nullable(),
})

export const ParentCreateSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z
    .string()
    .min(10, { message: "Номер телефона должен быть не менее 10 символ" })
    .max(12, { message: "Номер телефона должен быть не более 12 символов" })
    .regex(phoneRegex),
  sex: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  bot_user_id: z.number(),
  birthday: z.date().nullable(),
  max_payout: z.number().nullable(),
})

export const ActivityCreateSchema = z.object({
  name: z.string(),
  title: z.string().nullable(),
  percent_complete: z.number().nullable(),
  cost: z.number(),
  max_cost: z.number().nullable(),
  child_id: z.number(),
})

export interface ActivityChangeProps {
  activity_id: number
  setIsOpen: (isOpen: boolean) => void
}

export interface OpenDialogProps {
  setIsOpen: (isOpen: boolean) => void
}

export interface ChildParentIdsProps {
  child_id: number | null
  parent_id: number | null
}

export interface IChild {
  id: number
  bot_user_id: number
  name: string
  birthday: string | null
  sex: number
  max_payout: number | null
  phone: string
}

export interface IParent {
  id: number
  bot_user_id?: number
  name: string
  sex?: number
  access?: number
  phone: string
}

export interface IParentWithChildren {
  id: number
  bot_user_id?: number
  name: string
  sex?: number
  access?: number
  phone: string
  children: IChild[]
}

export interface IActivities {
  id: number
  name: string
  title?: string | null
  percent_complete?: number
  cost: number
  max_cost?: number | null
  child_id: number
}

export interface IActivitiesWithWeek {
  id: number
  name: string
  title?: string | null
  percent_complete?: number
  cost: number
  max_cost?: number | null
  child_id: number
  weeks: IWeek[]
}

export interface IActivitiesAdd {
  id?: number
  name: string
  title?: string | null
  percent_complete?: number
  cost: number
  max_cost?: number | null
  child_id: number
  weeks?: IWeek[]
}


export interface IActivitiesDay {
  is_done: boolean
  day: Date
  activity_id: number
  id: number
}

export interface IActivitiesPatch {
  id: number
  name: string
  title?: string | null
  percent_complete?: number
  cost: number
  max_cost?: number | null
  child_id: number
  setIsOpen: (isOpen: boolean) => void
}

export interface IWeek {
  week_day: string
  id: number
}
