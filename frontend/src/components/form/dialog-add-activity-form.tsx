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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IActivities, OpenDialogProps } from "@/store/types"
import { useChild } from "@/store/user"
import { ActivityService } from "@/service/activity.service"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const activitySchema = z.object({
  name: z.string().min(1, "Имя задания обязательно"),
  title: z.string().min(1, "Описание задания обязательно"),
  cost: z.string().min(1, "Стоимость должна быть неотрицательной"),
  percent_complete: z.number().min(0, "Процент выполнения должен быть неотрицательным"),
  max_cost: z.number().min(0, "Максимальная стоимость должна быть неотрицательной"),
  child_id: z.number().positive("ID ребенка должен быть положительным"),
})


export function ActivityForm({ setIsOpen }: OpenDialogProps) {
  const ChildId = useChild((state) => state.ChildId)

  const form = useForm<Omit<IActivities, "id">>({
    defaultValues: {
      percent_complete: 0,
      max_cost: 0,
      child_id: ChildId!,
    },
    resolver: zodResolver(activitySchema),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: Omit<IActivities, "id">) => ActivityService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities", ChildId] })
      setIsOpen(false)
    },
  })

  function onSubmit(values: Omit<IActivities, "id">) {
    const temp = { ...values, cost: Number(values.cost) }
    mutation.mutate(temp)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 text-foreground">
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
