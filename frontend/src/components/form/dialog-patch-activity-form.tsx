import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  ActivityChangeProps,
  IActivities,
  IActivitiesWithWeek,
} from "@/store/types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useOneActivityQuery, usePatchActivity } from "@/hooks/useActivityQuery"
import { useEffect } from "react"

const activitySchema = z.object({
  name: z.string().min(1, "Имя задания обязательно"),
  title: z.string().min(1, "Описание задания обязательно"),
  cost: z.string().min(1, "Стоимость должна быть неотрицательной"),
  percent_complete: z
    .number()
    .min(0, "Процент выполнения должен быть неотрицательным"),
  max_cost: z
    .number()
    .min(0, "Максимальная стоимость должна быть неотрицательной"),
  child_id: z.number().positive("ID ребенка должен быть положительным"),
})

export function ActivityPatchForm({
  activity_id,
  setIsOpen,
}: ActivityChangeProps) {
  console.log(`ActivityPatchForm ${activity_id}`)

  const activity = useOneActivityQuery(activity_id)
  console.log(activity)

  const form = useForm<IActivitiesWithWeek>({
    defaultValues: {
      name: "",
      title: "",
    },
    resolver: zodResolver(activitySchema),
  })

  useEffect(() => {
    console.log(`useEffect ${activity.data}`)
    const defaultValues: IActivitiesWithWeek = {
      name: activity.data?.name === undefined ? "" : activity.data?.name,
      title: activity.data?.title,
      cost: String(activity.data?.cost),
      percent_complete: activity.data?.percent_complete,
      max_cost: 0,
      child_id:
        activity.data?.child_id === undefined ? 1 : activity.data?.child_id,
    }
    form.reset(defaultValues)
  }, [activity.data, form.reset])

  const patchActivity = usePatchActivity({
    activity_id: activity_id,
    setIsOpen: setIsOpen,
  })

  const onSubmitPatch = (values: IActivities) => {
    const temp = {
      ...values,
      cost: Number(values.cost),
      setIsOpen: setIsOpen,
      id: activity_id,
    }
    console.log("onSubmitPatch")
    console.log(temp)
    patchActivity.mutate(temp)
  }

  return (
    <>
      {activity.isLoading && <div>Loading...</div>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitPatch)}
          className="space-y-2 text-foreground"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя задания</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание задания</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Стоимость</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Добавить</Button>
        </form>
      </Form>
      
    </>
  )
}
