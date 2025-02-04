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
import { useEffect, useState } from "react"
import axios from "axios"
import { maskAccountNumber } from "@/utility/maskAccountNumber"

const formSchema = z.object({
  accountName: z.string()
})

function Accounts() 
{
    const [ accounts, setAccounts ] = useState(null);
    const [ searchAccounts, setSearchAccounts ] = useState(null);
    const [ noAccounts, setNoAccounts ] = useState(false);
    const router = useRouter();

    console.log(accounts)

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
            console.log(response.data)
            const homeAccounts = response.data.filter((account)=> account.accountNature === 'Home');
            setAccounts(homeAccounts);
        }
        catch(error)
        {
            toast(error)
        } 
    }

    function onSubmit(data)
    {
      setNoAccounts(false)
      if(data.accountName === "")
        return
      // router.push(`/accounts/search?accNo=${data.accNo}`)
      const searchAccounts = accounts.filter((account)=> account.accountName.toLowerCase().includes(data.accountName.toLowerCase()) || account._id.toString() === data.accountName.toLowerCase())
      if(!searchAccounts?.length)
        setNoAccounts(true)
      setSearchAccounts(searchAccounts)
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: 
        {
          accountName: "",
        },
    })

  return (
    <div className="w-full flex flex-col gap-8 md:text-sm text-xs">
    <Form {...form} className="h-full">
      
      {/* <Link href='/accounts/create' className="font-bold text-md cursor border p-2 px-4 rounded-full bg-slate-400 w-fit">Create Account</Link> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="justify-center flex gap-4">
        
        <div className="w-full relative">
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Enter Account Name / Acc. No" className="py-6 rounded" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <span className="absolute right-4 cursor-pointer top-[50%] translate-y-[-50%] text-lg" onClick={()=> {form.reset(); setSearchAccounts(null); setNoAccounts(false) }}>x</span>
        </div>
        <Button type="submit" className="p-6">Search</Button>
      </form>
    </Form>
    
    {searchAccounts ? 
      <div className="flex flex-col gap-4 w-full">
          {searchAccounts.map((account)=>
          (
              <div className="flex lg:flex-row flex-col lg:justify-between items-start border-b-2 pb-4 gap-4" key={account._id} >
                  <div className="text-sm space-y-1">
                    <p className="font-semibold">{account.accountName}</p>
                    <p>{maskAccountNumber(account._id).toUpperCase()}</p>
                    <p className="text-gray-500">{account.type}</p>
                  </div>
                  <div className="flex h-fit gap-2">
                  <p className="w-fit flex flex-col items-center justify-center px-2 rounded-lg border">{account?.personalDetails || account?.entityDetails ? 'KYC Completed' : 'KYC Pending'}</p>
                  
                      {account?.personalDetails || account?.entityDetails ? 
                      <Button className="w-fit" onClick={()=> router.push(`/accounts/search?accNo=${account._id}&&type=${account.type}`)}>View</Button> :
                      <Button className="w-fit" onClick={()=> router.push(`/accounts/create/details?id=${account._id}&&type=${account.type}`)}>Details</Button>}
                      
                      {/* <Button className="w-fit" onClick={(e)=> handleDelete(e, account._id)}>Delete</Button> */}
                      </div>
              </div>
          ))}
      </div> : <></>}
      {noAccounts && <p className="text-xl text-center w-full">Restricted</p>}
      </div>
  )
}

export default Accounts
