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

import { Card } from "@/components/ui/card"
import { toast } from "sonner"

const FormSchema = z.object({
  type: z.string().min(1,{
    message: "Select account type.",
  }),
  fullname: z.string().min(10, {
    message: "Enter valid name"
  }),
  dob: z.string().min(8,{
    message: "Enter valid DOB"
  }),
  employer: z.string().min(8,{
    message: "Enter valid employer"
  }),
  occupation: z.string().min(8,{
    message: "Enter valid occupation"
  }),
  income: z.string().min(5,{
    message: "Enter valid annual income"
  })
})

const CreateProfile = () =>
{
    const router = useRouter();
    const [ account, setAccount ] = useState()

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: 
        {
            type: "",
            fullname: "",
            dob: "",
            employer: "",
            occupation: "",
            income: ""
        },
    })

    async function onSubmit(data) 
    {
        try
        {
            // const url = '/api/account'
            // const response = await axios.post(url, data);
            // const account = response.data.account
            const account = { "_id": "6737200fe863cfb002ae17ff", type: "Personal"}
            router.push(`/accounts/create/details?id=${account._id}&&type=${account.type}`)
        }
        catch(error)
        {
            toast.error("error")
        } 
    }

    const getUser = async () =>
    {
        try
        {
            const url = `/api/account/6737200fe863cfb002ae17ff`
            const response = await axios.get(url);
            setAccount(response.data);
        }
        catch(err)
        {
            console.log(err)
            toast.error(err)
        }
    }

    useEffect(()=>
    {
      getUser()
    },[])
    
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
    <div className="space-y-4">
      <Card className="p-6 rounded-xl flex justify-between items-center bg-orange-500 font-bold text-white">
        <h1 className="text-[36px]">Fints Banking Co.</h1>
        <h1 className="text-[20px]">Open account</h1>
      </Card>
    
    <div className="flex flex-col lg:flex-row gap-8">
      
    {account && 
    <div className="w-[40%] border rounded-lg p-4 space-y-4">
        <div className="bg-orange-500 font-bold text-lg p-2 text-white rounded-lg text-center mb-6">
            Customer Onboadring
        </div>
        <div>
            <p>Email</p>
            <p className="font-bold">{account.email}</p>
        </div>
        <div>
            <p>Contact</p>
            <p className="font-bold">{account.contact}</p>
        </div>
        <div>
            <p>DOB</p>
            <p className="font-bold">{new Date(account.personalDetails.dateOfBirth).toLocaleDateString()}</p>
        </div>
        <div>
            <p>Occupation</p>
            <p className="font-bold">{account.personalDetails.occupation}</p>
        </div>
        <div>
            <p>Annual Income</p>
            <p className="font-bold">${account.personalDetails.annualIncome}</p>
        </div>
    </div>}
    <Form {...form} className="lg:w-full w-[60%]">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent >
                  <SelectItem className="h-12" value="Personal">Personal</SelectItem>
                  <SelectItem className="h-12" value="Entity">Entity</SelectItem>
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Full name</FormLabel>
              <FormControl className="h-12">
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem >
              <FormLabel>DOB</FormLabel>
              <FormControl className="h-12">
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer</FormLabel>
              <FormControl className="h-12">
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl className="h-12">
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Income ($)</FormLabel>
              <FormControl className="h-12">
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="p-6">Initiate Process</Button>
    
{/*       
      <Button onClick={updateAccountNames}>Update account names</Button> */}
      </form>  
    </Form>

    
    </div>
    </div>
  )
}

export default CreateProfile
