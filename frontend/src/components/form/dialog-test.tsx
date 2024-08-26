import { ChildService } from "@/service/child.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

function PersonDetail({ id: number }) {
  const { data } = useQuery({
    queryKey: ['person', id],
    queryFn: () => ChildService.get_by_phone_number(id),
  })
  
  const { mutate } = useMutation({
    mutationFn: (values) => updatePerson(values),
  })

  if (data) {
    return <TestForm person={data} onSubmit={mutate} />
  }

  return 'loading...'
}

function TestForm({ person, onSubmit }) {
  const { register, handleSubmit } = useForm({ defaultValues: person })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input {...register('firstName')} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input {...register('lastName')} />
      </div>
      <input type="submit" />
    </form>
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
// import { useQuery } from "@tanstack/react-query"
// import { ChildService } from "@/service/child.service"



// export function TestForm() {
//   const usePhoneNumber = (phone_number: string | undefined) => {
//     return useQuery({
//       queryFn: async () => await ChildService.get_by_phone_number(phone_number),
//       queryKey: ["child_phone", phone_number],
//       enabled: !!phone_number
//     })
//   }

//   const formSchema = z.object({
//     phone: z
//       .string(),
//   })

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       phone: "",
//     },
//   })
  
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     const phoneNumber = usePhoneNumber(values.phone)
//     if (phoneNumber.isSuccess) {
//       console.log(`Запускается мутация по добавлению в этому пользователю ${phoneNumber.data?.id}`)
//     } else {
//       console.log(`Создается новый пользователь ${values}`)
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//       <FormField
//           control={form.control}
//           name="phone"
//           render={({ ...field }) => (
//             <FormItem>
//               <FormLabel>Телефон</FormLabel>
//               <FormControl>
//                 <Input {...field} type="number" />
//               </FormControl>
//               <FormDescription>Введите номер телефона ребенка.</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }
