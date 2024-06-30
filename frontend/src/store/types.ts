export interface IChild {
  id: number
  bot_user_id: number
  name: string
  birthday?: Date
  sex: number
  max_payout?: number
  phone?: string
}

export interface IParent {
  id: number
  bot_user_id?: number
  name: string
  sex?: number
  access?: number
  phone: string
}

export interface IActivities {
  id: number
  name: string
  title: string
  percent_complete?: number
  cost: number
  max_cost?: number
  child_id: number
}

export interface IActivitiesDay {
  is_done: boolean
  day: Date
  activity_id: number
  id: number
}

export interface IWeek {
  week_day: string
  id: number
}
