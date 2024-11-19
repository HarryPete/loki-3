'use client'

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axios from "axios"

const FormSchema = z.object({
    type: z.string().min(3,{
      message: "Enter type",
    }),
    date: z.string().min(2,{
      message: "Enter valid date",
    }),
    counterParty: z.string(),
    amount: z.string().min(1,{
        message: "Enter valid amount",
    }),
    description: z.string()
})
  

const TransactionForm = ({id, getAccount, setShowTransactionForm}) =>
{

    const [ accounts, setAccounts ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>
    {
        getAccounts();
    },[])

    async function getAccounts()
    {
        try
        {
            const url = '/api/account';
            const response = await axios.get(url);
            setAccounts(response.data);
            setLoading(false);
        }
        catch(error)
        {
            toast(error);
            setLoading(false);
        }
    }

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: 
        {
            type: "",
            date: "",
            counterParty: "",
            amount: "",
            description: "",
        },
    })

    async function onSubmit(data) 
    {
        try
        {
            const transactionDetails = {...data, primaryAccount: id, date: new Date(data.date)}
            console.log(transactionDetails)
            const url = '/api/transactions'
            const response = await axios.post(url, {transactionDetails})
            getAccount();
            setShowTransactionForm(false)
            toast(response.data.message);
        }
        catch(error)
        {
            toast(error)
        } 
    }

    if(loading)
        return <>Loading</>

    return(
    <div className="w-[40vw] bg-white dark:text-black p-8 rounded">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Transact Now!</h1>
        <Form {...form} className="w-[40vw] bg-white">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full flex flex-col lg:flex-row gap-4">
        <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
            <FormItem className="w-full lg:w-1/2">
              <FormLabel>Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Transfer">Transfer</SelectItem>
                  <SelectItem value="Inward">Inward</SelectItem>
                  <SelectItem value="Outward">Outward</SelectItem>
                  <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                  <SelectItem value="Loan">Loan</SelectItem>
                  <SelectItem value="Deposit">Deposit</SelectItem>
                  <SelectItem value="Sale">Sale</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
	    <FormItem className="w-full lg:w-1/2">
	        <FormLabel>Transaction Date</FormLabel>
	        <FormControl>
		    <Input type="date" {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

        
    </div> 

    <div className="w-full flex flex-col lg:flex-row gap-4">
        <FormField
          control={form.control}
          name="counterParty"
          render={({ field }) => (
            <FormItem className="w-full lg:w-1/2">
              <FormLabel>Counter Party</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {accounts.map((account)=>
                (
                    <SelectItem value={account?.entityDetails?.accountDetails?._id ?? account.personalDetails.accountDetails._id}>{account?.personalDetails?.firstname ? (account.personalDetails.firstname +' ' +account.personalDetails.lastname) : account.entityDetails.name}</SelectItem>
                ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
	    <FormItem className="w-full lg:w-1/2">
	        <FormLabel>Amount</FormLabel>
	        <FormControl>
		    <Input placeholder="" {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

      
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Description</FormLabel>
	        <FormControl>
		    <Input placeholder="" {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

    </div>

    
    <Button type="submit">Proceed</Button>
    <Button className ="ml-4" onClick={()=> setShowTransactionForm(false)} >Cancel</Button>
    </form>
    </Form>
    </div>
    )
}

export default TransactionForm