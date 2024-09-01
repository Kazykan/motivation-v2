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
