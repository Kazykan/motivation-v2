import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { useTgUser } from "@/store/tg_user"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { ChildCreateSchema } from "@/store/types"
import { useAddChild } from "@/hooks/useChildQuery"

export function ChildForm() {
  const tgChildId = useTgUser((state) => state.ChildBotUserId)
  const tgUserName = useTgUser((state) => state.first_name)

  const form = useForm<z.infer<typeof ChildCreateSchema>>({
    resolver: zodResolver(ChildCreateSchema),
    defaultValues: {
      name: tgUserName === null ? "" : tgUserName,
      bot_user_id: tgChildId === null ? undefined : tgChildId,
      birthday: null,
      max_payout: null,
    },
  })

  const addChild = useAddChild()

  function onSubmit(values: z.infer<typeof ChildCreateSchema>) {
    addChild.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Имя</FormLabel>
              <FormControl>
                <Input placeholder={field.name} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>
                This is your public display phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пол</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">мужской</SelectItem>
                  <SelectItem value="2">женский</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
