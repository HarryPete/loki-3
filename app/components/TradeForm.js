import axios from "axios";
import { useEffect, useState } from "react"
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

const FormSchema = z.object({
    profile: z.string().min(3,{
      message: "Select profile",
    }),
    equity: z.string().min(1,{
      message: "Enter valid equity",
    }),      
    description: z.string()
})
  
const TradeForm = ({id, setShowTradeForm}) =>
{
    const [ accounts, setAccounts ] = useState(null);
    const [ loading, setLoading ] = useState(true); 
    const [ profiles, setProfiles ] = useState([]);

    useEffect(()=>
    {
        getPersonalAccounts();
    },[])

    const getPersonalAccounts = async () =>
    {
        try
        {
            const url = '/api/personal'
            const response = await axios.get(url);
            setAccounts(response.data);
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            setLoading(false)
        }
    }

    const onSubmit = async (data) =>
    {
        try
        {
            const url = `/api/entity/${id}`
            const response = await axios.put(url, data)
            console.log(response.data.message)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: 
        {
            profile: "",
            equity: "", 
            description: ""
        }
    })

    console.log(accounts)

    if(loading)
        return

    return(
        <div className="">
            
        <Form {...form} className="w-[40vw] bg-white">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full flex flex-col gap-4">
        
        <FormField
          control={form.control}
          name="profile"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Select profile</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {accounts.map((account)=>
                (
                    <SelectItem key={account._id} value={account._id}>{account.accountDetails.accountName}</SelectItem>
                ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
        control={form.control}
        name="equity"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Equity</FormLabel>
	        <FormControl>
		    <Input {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>
        
        <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Description</FormLabel>
	        <FormControl>
		    <Input {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

    </div> 
    <Button type="submit">Add Profile</Button>
    
    {profiles.length > 0 &&
    <div className="flex flex-wrap gap-2">
        {profiles.map((account,index)=>
        (
            <p className="bg-gray-300 rounded px-3 py-1 cursor-pointer" onClick={()=> removeProfiles(account.profile)}>{getProfileName(account) +' at ' +account.equity +'% equity'}</p>
        ))}
    </div>}
    
    </form>
    </Form>
    <div className="flex gap-2 mt-2">
    </div>
    </div>
    )
}

export default TradeForm