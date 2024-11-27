"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { useEffect, useState } from "react"
import { maskAccountNumber } from "@/utility/maskAccountNumber"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const FormSchema = z.object({
  type: z.string().min(1,{
    message: "Select account type.",
  }),
  email: z.string().email({
    message: "Enter valid email"
  }),
  contact: z.string().min(8,{
    message: "Enter valid contact number"
  })
})

const CreateProfile = () =>
{
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: 
        {
            type: "",
            email: "",
            contact: ""
        },
    })

    async function onSubmit(data) 
    {
        try
        {
            const url = '/api/account'
            const response = await axios.post(url, data);
            const account = response.data.account
            router.push(`/accounts/create/details?id=${account._id}&&type=${account.type}`)
            toast(response.data.message);
        }
        catch(error)
        {
            toast(error)
        } 
    }

    async function handleDelete(e, id)
    {
        e.preventDefault();

        try
        {
            const url = `/api/account/${id}`
            const response = await axios.delete(url);
            toast(response.data.message);
            getAccounts();
        }
        catch(error)
        {
            toast(error);
        }
    }

    // async function updateAccountNames()
    // {
    //   try
    //   {
    //     const url = '/api/updateAccName'
    //     const response = await axios.get(url);
    //     console.log(response.data.message)
    //   }
    //   catch(error)
    //   {

    //   }
    // }

    return (
    <div className="flex flex-col lg:flex-row gap-4">
    <Form {...form} className="w-full lg:w-2/3">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
      <h1 className="text-xl font-bold">Open your account at <span className="text-red-700">FINTS 360</span> now!</h1>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Entity">Entity</SelectItem>
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Account</Button>
    
{/*       
      <Button onClick={updateAccountNames}>Update account names</Button> */}
      </form>  
    </Form>
    
    </div>
  )
}

export default CreateProfile
