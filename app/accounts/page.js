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
    <div className="w-full flex flex-col gap-8">
    <Form {...form} className="h-full">
      
      {/* <Link href='/accounts/create' className="font-bold text-md cursor border p-2 px-4 rounded-full bg-slate-400 w-fit">Create Account</Link> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="justify-center flex gap-4">
        
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
        <Button type="submit" className="p-6">Search</Button>
      </form>
    </Form>
    <Button className="p-6 w-fit" onClick={()=> {form.reset(); setSearchAccounts(null); setNoAccounts(false) }}>Clear</Button>
    
    
    {/* <Button className="p-6 w-fit" onClick={()=> {setSearchAccounts(null); form.reset()}}>Clear</Button> */}

    {/* {accounts && <div className="w-full flex gap-4 justify-center">
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
      </div>} */}



    {searchAccounts ? 
      <div className="flex flex-col gap-4 w-full">
          {searchAccounts.map((account)=>
          (
              <div className="flex justify-between border-b-2 pb-4 items-center" key={account._id} >
                  <div>
                    <p className="font-bold">{account.accountName}</p>
                    <p>{maskAccountNumber(account._id).toUpperCase()}</p>
                    <p className="text-gray-500 font-bold">{account.type}</p>
                  </div>
                  <div className="flex h-fit gap-2">
                      {account?.personalDetails || account?.entityDetails ? 
                      <Button className="w-fit" onClick={()=> router.push(`/accounts/search?accNo=${account._id}&&type=${account.type}`)}>View</Button> :
                      <Button className="w-fit" onClick={()=> router.push(`/accounts/create/details?id=${account._id}&&type=${account.type}`)}>Details</Button>}
                      
                      {/* <Button className="w-fit" onClick={(e)=> handleDelete(e, account._id)}>Delete</Button> */}
                      <p className="w-fit flex flex-col items-center justify-center px-2 text-white rounded text-sm" style={{backgroundColor : account?.personalDetails || account?.entityDetails ? 'green' : 'red'}} >{account?.personalDetails || account?.entityDetails ? 'KYC Completed' : 'KYC Pending'}</p>
                  </div>
              </div>
          ))}
      </div> : <></>}
      {noAccounts && <p className="text-red-600 text-2xl text-center w-full italic">Restricted</p>}
      </div>
  )
}

export default Accounts
