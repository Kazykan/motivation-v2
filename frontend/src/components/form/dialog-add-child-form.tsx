import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDebounce } from "react-use"
import InputMask from "react-input-mask"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  ChildCreateSchema,
  ChildParentIdsProps,
  IChild,
  OpenDialogProps,
} from "@/store/types"
import {
  useAddChild,
  useAddChildTelegramBotId,
  useChildByPhoneNumber,
} from "@/hooks/useChildQuery"
import { Loader2 } from "lucide-react"
import { useParent } from "@/store/parent"
import { useEffect } from "react"
import { useTgUser } from "@/store/tg_user"

export function ChildForm({ setIsOpen }: OpenDialogProps) {
  const tgUserId = useTgUser((state) => state.tgUserId)


  const form = useForm<z.infer<typeof ChildCreateSchema>>({
    resolver: zodResolver(ChildCreateSchema),
    defaultValues: {
      bot_user_id: tgUserId,
      birthday: null,
      max_payout: null,
    },
  })

  const child = useChildByPhoneNumber()
  const phoneNumber = form.watch("phone")

  useDebounce(
    () => {
      child.mutate(phoneNumber)
    },
    250,
    [phoneNumber]
  )

  const addChildTelegramBotId = useAddChildTelegramBotId({ setIsOpen })

  function onSubmitAddChildTelegramBotId(data: Pick<IChild, "id" | "bot_user_id">) {
    addChildTelegramBotId.mutate(data)
  }

  const addChild = useAddChild()

  function onSubmit(values: z.infer<typeof ChildCreateSchema>) {
    if (child.data?.id !== null && child.data?.id !== undefined) {
      console.log(`child.data?.id = ${child.data?.id}`)
    } else {
      addChild.mutate(values)
    }
  }

  useEffect(() => {
    if (
      addChild.data !== null &&
      addChild.data !== undefined &&
      addChild.data.id !== undefined &&
      addChild.data.id !== null
    ) {
      addChildTelegramBotId.mutate({
        child_id: addChild.data.id,
        parent_id: parentId,
      })
    }
  }, [addChild.isSuccess])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <InputMask
                  {...field}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  mask="+7 (999) 999-99-99"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  onChange={(e: any) => {
                    const value = e.target.value.replace(/\D/g, "")
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormDescription>Введите номер телефона</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {phoneNumber && phoneNumber.match(/\d{11}$/) && (
          <>
            {child.isPending ? (
              <div className="text-foreground">Loading...</div>
            ) : (
              <>
                {child.data !== undefined ? (
                  <div className="space-x-2 flex items-center">
                    <div className="text-foreground">
                      {child.data.name} - это вы?
                    </div>
                    <Button
                      disabled={addChildTelegramBotId.isPending}
                      onClick={() =>
                        onSubmitAddChildTelegramBotId({
                          id: child.data!.id!,
                          bot_user_id: tgUserId!,
                        })
                      }
                    >
                      {addChildTelegramBotId.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Да"
                      )}
                    </Button>{" "}
                    <Button className="text-foreground" variant="outline">
                      Нет
                    </Button>
                  </div>
                ) : (
                  <>
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
                    {/* <Button type="submit">
                      Submit */}
                    <Button
                      disabled={addChild.isPending && addChildTelegramBotId.isPending}
                      type="submit"
                    >
                      {addChild.isPending && addChildTelegramBotId.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </form>
    </Form>
  )
}




// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { useTgUser } from "@/store/tg_user"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select"
// import { ChildCreateSchema } from "@/store/types"
// import { useAddChild } from "@/hooks/useChildQuery"

// export function ChildForm() {
//   const tgChildId = useTgUser((state) => state.ChildBotUserId)
//   const tgUserName = useTgUser((state) => state.first_name)

//   const form = useForm<z.infer<typeof ChildCreateSchema>>({
//     resolver: zodResolver(ChildCreateSchema),
//     defaultValues: {
//       name: tgUserName === null ? "" : tgUserName,
//       bot_user_id: tgChildId === null ? undefined : tgChildId,
//       birthday: null,
//       max_payout: null,
//     },
//   })

//   const addChild = useAddChild()

//   function onSubmit(values: z.infer<typeof ChildCreateSchema>) {
//     addChild.mutate(values)
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-foreground">Имя</FormLabel>
//               <FormControl>
//                 <Input placeholder={field.name} {...field} />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="phone"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Телефон</FormLabel>
//               <FormControl>
//                 <Input {...field} type="number" />
//               </FormControl>
//               <FormDescription>
//                 This is your public display phone.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="sex"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Пол</FormLabel>
//               <Select onValueChange={field.onChange}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="1">мужской</SelectItem>
//                   <SelectItem value="2">женский</SelectItem>
//                 </SelectContent>
//               </Select>
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }
