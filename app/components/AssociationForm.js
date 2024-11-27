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
    })     
})
  
const AssociationForm = ({title, setAssociationForm}) =>
{
    const [ accounts, setAccounts ] = useState(null);
    const [ loading, setLoading ] = useState(true); 
    const [ profiles, setProfiles ] = useState([]);

    useEffect(()=>
    {
        getAccounts();
    },[])

    const getAccounts = async () =>
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
        finally
        {
            setLoading(false)
        }
    }

    const onSubmit = (data) =>
    {
        setProfiles((prev)=> [...prev, data.profile]);
    }

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: 
        {
            profile: ""
        }
    })

    const removeProfiles = (id) =>
    {
        const updatedProfiles = profiles.filter((account)=> account !== id);
        setProfiles(updatedProfiles)
    }

    const getProfileName = (account) =>
    {
        const profileDetail = accounts.find((acc)=> acc._id == account);
        return profileDetail.accountName
    }
    
    const updateAssociation = async () =>
    {
        try
        {
            const url = `/api/article/${title}`
            const response = await axios.post(url, {associations: profiles})
            console.log(response.data)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    if(loading)
        return

    return(
        <div className="w-[40vw] bg-white p-8 rounded">
            
        <h1 className="text-2xl font-bold mb-4 text-red-600">Article Association</h1>
        <Form {...form} className="w-[40vw] bg-white">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full flex flex-col items-end lg:flex-row gap-4">
        
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
                    <SelectItem key={account._id} value={account._id}>{account.accountName}</SelectItem>
                ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <Button type="submit">Add Profile</Button>       
    </div> 

    {profiles.length > 0 &&
    <div className="flex flex-wrap gap-2">
        {profiles.map((account,index)=>
        (
            <p className="bg-gray-300 rounded px-3 py-1 cursor-pointer text-sm" onClick={()=> removeProfiles(account)}>{getProfileName(account)}</p>
        ))}
    </div>}
    
    </form>
    </Form>
    <div className="flex gap-2 mt-2">
        <Button onClick={updateAssociation}>Update Association</Button>
        <Button type="submit" onClick={()=> setAssociationForm(false)}>Cancel</Button>
    </div>
    </div>
    )
}

export default AssociationForm