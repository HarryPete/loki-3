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

    const [ accounts, setAccounts ] = useState(null);
    const [ entityType, setEntityType ] = useState(0);
    const [ personalType, setPersonalType ] = useState(null);
    const router = useRouter();

    useEffect(()=>
    {
        getAccounts();
    },[])

    async function getAccounts() 
    {
        try
        {
            const url = '/api/account'
            const response = await axios.get(url);
            const entityType = response.data.filter((account) => account.type === "Entity");
            const personalType = response.data.filter((account) => account.type === "Personal");
            setEntityType(entityType);
            setPersonalType(personalType)
            setAccounts(response.data);
        }
        catch(error)
        {
            toast(error)
        } 
    }

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
            const response = await axios.post(url, data)
            toast(response.data.message);
            getAccounts();
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
        {accounts && <div className="w-full flex gap-4 justify-center">
        <div className="flex flex-col items-center gap-4 w-full lg:w-1/3 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300">
          <span>Accounts</span>
          <p className="font-bold text-2xl">{accounts.length}</p>
        </div>
        <div className="flex flex-col items-center gap-4 w-full lg:w-1/3 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300">
          <span>Entity</span>
          <p className="font-bold text-2xl">{entityType.length}</p>
        </div>
        <div className="flex flex-col items-center gap-4 w-full lg:w-1/3 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300">
          <span>Personal</span>
          <p className="font-bold text-2xl">{accounts.length - entityType.length}</p>
        </div>        
      </div>}
      </form>

    </Form>
    {accounts && 
    <div className="h-[80vh] overflow-y-scroll flex flex-col gap-4 w-full lg:w-1/2 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300">
        <h1 className="text-lg font-bold">Entity Accounts</h1>
        {entityType.map((account)=>
        (
            <div className="flex flex-col gap-2" >
                <p>{maskAccountNumber(account._id).toUpperCase()}</p>
                <p>Account Type : {account.type}</p>
                <p>Email : {account.email}</p>
                <p>Contact : {account.contact}</p>
                <div className="flex gap-2">
                    {account?.personalDetails || account?.entityDetails ? 
                    <Button className="w-fit" onClick={()=> router.push(`/accounts/search?accNo=${account._id}&&type=${account.type}`)}>View</Button> :
                    <Button className="w-fit" onClick={()=> router.push(`/accounts/create/details?id=${account._id}&&type=${account.type}`)}>Details</Button>}
                    
                    <Button className="w-fit" onClick={(e)=> handleDelete(e, account._id)}>Delete</Button>
                    <p className="w-fit flex flex-col items-center justify-center px-2 text-white rounded text-sm" style={{backgroundColor : account?.personalDetails || account?.entityDetails ? 'green' : 'red'}} >{account?.personalDetails || account?.entityDetails ? 'Completed' : 'Pending'}</p>
                </div>
            </div>
        ))}
    </div>}
    {accounts && 
    <div className="h-[80vh] overflow-y-scroll flex flex-col gap-4 w-full lg:w-1/2 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300">
        <h1 className="text-lg font-bold">Personal Accounts</h1>
        {personalType.map((account)=>
        (
            <div className="flex flex-col gap-2" >
                <p>{maskAccountNumber(account._id).toUpperCase()}</p>
                <p>Account Type : {account.type}</p>
                <p>Email : {account.email}</p>
                <p>Contact : {account.contact}</p>
                <div className="flex gap-2">
                    {account?.personalDetails || account?.entityDetails ? 
                    <Button className="w-fit" onClick={()=> router.push(`/accounts/search?accNo=${account._id}&&type=${account.type}`)}>View</Button> :
                    <Button className="w-fit" onClick={()=> router.push(`/accounts/create/details?id=${account._id}&&type=${account.type}`)}>Details</Button>}
                    
                    <Button className="w-fit" onClick={(e)=> handleDelete(e, account._id)}>Delete</Button>
                    <p className="w-fit flex flex-col items-center justify-center px-2 text-white rounded text-sm" style={{backgroundColor : account?.personalDetails || account?.entityDetails ? 'green' : 'red'}} >{account?.personalDetails || account?.entityDetails ? 'Completed' : 'Pending'}</p>
                </div>
            </div>
        ))}
    </div>}
    </div>
  )
}

export default CreateProfile
