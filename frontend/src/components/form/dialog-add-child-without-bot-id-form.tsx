import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDebounce } from "react-use"

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
import { ChildCreateSchema, ChildSchema } from "@/store/types"
import { useAddChild, useChildQueryPhoneNumber } from "@/hooks/useChildQuery"
import { useAddParentChildRelationship } from "@/hooks/useParentQuery"
import { useEffect, useState } from "react"

export function ChildFormWithoutBotId() {
  const tgParentId = useTgUser((state) => state.tgParentId)
  const [ChildPhone, setChildPhone] = useState<string | undefined>(undefined)
  const [childData, setChildData] = useState<z.infer<
    typeof ChildSchema
  > | null>(null)

  const form = useForm<z.infer<typeof ChildCreateSchema>>({
    resolver: zodResolver(ChildCreateSchema),
    defaultValues: {
      bot_user_id: null,
      birthday: null,
      max_payout: null,
    },
  })

  const addChild = useAddChild()

  useEffect(() => {
    if (ChildPhone !== null && ChildPhone !== undefined && ChildPhone?.length > 6) {
      const child = useChildQueryPhoneNumber(ChildPhone)
      if (child.data) {
        setChildData(child.data)
      }
    }
  }, [ChildPhone])

  // useDebounce(
  //   () => {
  //     const child = useChildQueryPhoneNumber(ChildPhone)?.data
  //     if (child) {
  //       setChildData(child)
  //     }
  //   },
  //   250,
  //   [ChildPhone]
  // )

  const addRelationship = useAddParentChildRelationship(tgParentId)

  function onSubmit(values: z.infer<typeof ChildCreateSchema>) {
    setChildPhone((_) => values.phone)
    if (childData) {
      alert("Такой номер телефон уже зарегистрирован в системе.")
      console.log(
        `addRelationship childData.id-${childData.id}  tgParentId${tgParentId}`
      )
      // addRelationship.mutate({
      //   child_id: childData.id,
      //   parent_id: tgParentId,
      // })
    } else {
      console.log(`addChild ${values}`)
      // addChild.mutate(values)
    }
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
                <Input {...field} />
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
              <FormDescription>Введите номер телефона ребенка.</FormDescription>
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
