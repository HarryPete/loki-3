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
import Fuse from "fuse.js"
import HitInformation from "../components/HitInformation"

function matchRange(searchKey, accountName) 
{ 
    const string1 = searchKey.toLowerCase();
    const index = accountName.find(string1[0]) ?? 0; 
    const string2 = accountName.toLowerCase().slice(index).split('');

    let count=0;
    string2.forEach((char)=>
    {
      if(string1.includes(char))
        count++;
    })

    const match = Math.floor(count*100/searchKey.length)
    
    return match > 100 ? 100 : match;
}

const formSchema = z.object({
  accountName: z.string()
})

function Screen() 
{
    const [ accounts, setAccounts ] = useState(null);
    const [ searchAccounts, setSearchAccounts ] = useState(null);
    const [ activeAccount, setActiveAccount ] = useState(null);
    const [ searchKey, setSearchKey ] = useState(null);
    const [ noAccounts, setNoAccounts ] = useState(false);

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
            setAccounts(response.data);
        }
        catch(error)
        {
            console.log(error);
        } 
    }

    function onSubmit(data)
    {
      // router.push(`/accounts/search?accNo=${data.accNo}`)
      
      setSearchKey(data.accountName)
      let matches = [];
      const fuse = new Fuse(accounts,
        {
          includeScore: true, // Includes the matching score
          threshold: 0.3, // Controls the matching sensitivity (lower = stricter)
          keys: ['accountName'] // Specify keys if working with objects
      })
      const result = fuse.search(data.accountName)
      if (result.length > 0) 
      {
        result.forEach(match => 
        {
          let account = {...match.item, matchScore: match.score};
          matches.push(account) 
        });          
        setSearchAccounts(matches);
      } 
      else 
      {
        setNoAccounts(true);
      }
    }

    console.log()

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
      
      {/* <Link href='/accounts/create' className="font-bold text-md cursor border p-2 rounded w-fit">+Account</Link> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="justify-center flex gap-4">
        
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Enter Name" className="py-6 rounded" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="p-6">Search</Button>
        

      </form>
    </Form>
    <Button className="p-6 w-fit" onClick={()=> {form.reset(); setSearchAccounts(null); setNoAccounts(false)}}>Clear</Button>
    {searchAccounts?.length>0 && <h1><span className="font-bold text-red-600 text-lg">Hits: </span>{searchAccounts?.length}</h1>}

    {searchAccounts ? 
      <div className="flex flex-col gap-4 w-full">
          {searchAccounts.map((account)=>
          (
            <div className={`w-full flex flex-col gap-4 border-b-2 p-4 rounded ${account.personalDetails?.isPEP === 'Yes' && 'bg-red-600 text-white'}`} key={account._id} >
                <div className="w-full flex items-center justify-between">
                  <p className="font-bold">{account.accountName}</p>
                  <Button onClick={()=> setActiveAccount(account)}>More Info</Button>
                </div>
            </div>
          ))}
      </div>: <></>}
      {noAccounts && <p className="text-gray-400 text-2xl text-center w-full italic">No matches found</p>}
      {activeAccount && 
        <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}  >
          <HitInformation account={activeAccount} setActiveAccount={setActiveAccount}/>
        </div>}
      </div>
  )
}

export default Screen
