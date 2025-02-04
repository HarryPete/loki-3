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
    title: z.string().min(10, {
        message: "Enter title"
    }),
    coverImage: z.string().min(10,{
        message: "Enter url"
    }),
    introduction: z.string().min(30,{
        message: "Enter intro"
    }),
    body: z.string().min(30,{
        message: "Enter body"
    }),
    footer: z.string().min(30,{
        message: "Enter footer"
    }),
    date: z.string().min(1,{
        message: "Enter date"
    }),
    keywords: z.string().min(3,{
        message: "Enter keyword"
    })
})
  
const ArticleForm = ({getArticles, setShowArticleForm}) =>
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

    // const onSubmit = (data) =>
    // {
    //     if(profiles.includes(data.association))
    //         return
    //     setProfiles((prev)=> [...prev, data.association]);
    // }

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: 
        {
            title: "",
            introduction: "", 
            body: "",
            footer: "", 
            date: "", 
            keywords: "",
            coverImage: "", 
        }
    })

    // const removeProfiles = (id) =>
    // {
    //     const updatedProfiles = profiles.filter((account)=> account !== id);
    //     setProfiles(updatedProfiles)
    // }

    // const getProfileName = (account) =>
    // {
    //     const profileDetail = accounts.find((acc)=> acc._id == account);
    //     return profileDetail.accountName
    // }
    
    const onSubmit = async (data) =>
    {
        try
        {
            console.log(data)
            const url = `/api/article`
            await axios.post(url, data)
            getArticles();
            setShowArticleForm(false)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    if(loading)
        return

    return(
        <div>
        <Form {...form} className="w-[40vw] bg-white">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full flex flex-col gap-2">

        <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Title</FormLabel>
	        <FormControl>
		    <Input {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

        <FormField
        control={form.control}
        name="introduction"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Introduction</FormLabel>
	        <FormControl>
		    <Input {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

        <FormField
        control={form.control}
        name="body"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Body</FormLabel>
	        <FormControl>
		    <Input {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

        <FormField
        control={form.control}
        name="footer"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Footer</FormLabel>
	        <FormControl>
		    <Input {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>    

        <div className="flex gap-4">
        <FormField
        control={form.control}
        name="coverImage"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Cover image</FormLabel>
	        <FormControl>
		    <Input {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/> 

        <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Date</FormLabel>
	        <FormControl>
		    <Input type="date" {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/> 

         
        </div>

        <div className="flex gap-4">
        {/* <FormField
          control={form.control}
          name="association"
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
        />   */}
        <FormField
        control={form.control}
        name="keywords"
        render={({ field }) => (
	    <FormItem className="w-full">
	        <FormLabel>Keywords</FormLabel>
	        <FormControl>
		    <Input {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>
         
        </div>
    </div> 

    
    {/* {profiles.length > 0 &&
    <div className="flex flex-wrap gap-2">
        {profiles.map((account,index)=>
        (
            <p className="bg-gray-300 rounded px-3 py-1 cursor-pointer text-sm" onClick={()=> removeProfiles(account)}>{getProfileName(account)}</p>
        ))}
    </div>}
    <Button type="submit" onClick={()=> publishArticle()}>Add Association</Button> */}

    <Button type="submit">Publish</Button>
    </form>
    </Form>
    
    </div>
    )
}

export default ArticleForm