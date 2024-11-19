"use client"

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
import { useRouter } from "next/navigation"
import Link from "next/link"

const formSchema = z.object({
    accNo: z.string().min(14, {
    message: "Invalid account no",
  }),
})

function Accounts() 
{

    const router = useRouter();

    function onSubmit(data)
    {
        router.push(`/accounts/search?accNo=${data.accNo}`)
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: 
        {
            accNo: "",
        },
    })

  return (
    <Form {...form}  className="h-full">
      <form onSubmit={form.handleSubmit(onSubmit)} className="justify-center flex gap-4">
        <FormField
          control={form.control}
          name="accNo"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormControl>
                <Input placeholder="Enter Account Number"  className="py-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
      <Link href='/accounts/create' className="absolute right-5[vw] top-20 my-3 font-bold text-xl cursor border p-2 rounded">+Account</Link>
    </Form>
  )
}

export default Accounts
