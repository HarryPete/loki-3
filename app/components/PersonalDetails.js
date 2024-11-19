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
    firstname: z.string().min(3,{
      message: "Enter valid firstname",
    }),
    lastname: z.string().min(2,{
      message: "Enter valid industry",
    }),
    gender: z.string().min(1,{
        message: "Select gender",
    }),
    dateOfBirth: z.string().min(1,{
        message: "Enter DOB",
    }),
    occupation: z.string().min(3,{
        message: "Enter occupation",
    }),
    annualIncome: z.string().min(4,{
      message: "Enter annual income",
    }),
    // organisation: z.string().min(5,{
    //     message: "Enter organisation",
    // }),
    isPEP: z.string().min(1,{
        message: "Select option",
    }),
    passportNumber: z.string().min(8,{
        message: "Invalid number",
    }),
    countryOfIssue: z.string().min(3,{
        message: "Invalid country",
    }),
    dateOfIssue: z.string().min(1,{
        message: "Enter date of issue",
    }),
    dateOfExpiry: z.string().min(1,{
        message: "Enter date of expiry",
    }),
    startDate: z.string().min(1,{
        message: "Enter date of issue",
    }),
    endDate: z.string().min(1,{
        message: "Enter date of expiry",
    }),
    monthlyRent: z.string().min(1,{
        message: "Invalid number",
    }),
    street: z.string().min(12,{
      message: "Enter valid street"
    }),
    city: z.string().min(3,{
      message: "Enter valid city"
    }),
    state: z.string().min(3,{
      message: "Enter valid state"
    }),
    country: z.string().min(3,{
      message: "Enter valid country"
    }),
    city: z.string().min(6,{
      message: "Enter valid city"
    }),
    zipcode: z.string().min(4,{
      message: "Enter valid zipcode"
    })
  })
  

const PersonalDetails = ({id}) =>
{

    const [ entities, setEntities ] = useState(null);

    useEffect(()=>
    {
        getEntities();
    },[])

    async function getEntities()
    {
        try
        {
            const url = '/api/entity';
            const response = await axios.get(url);
            setEntities(response.data);
        }
        catch(error)
        {
            toast(error);
        }
    }

    console.log(entities);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: 
        {
            firstname: "",
            lastname: "",
            gender: "",
            dateOfBirth:"",
            occupation: "",
            organisation: "",
            isPEP: "",
            annualIncome:"",
            passportNumber: "",
            countryOfIssue: "",
            dateOfIssue: "",
            dateOfExpiry: "",
            startDate: "",
            endDate: "",
            monthlyRent: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipcode: ""
        },
    })

    async function onSubmit(data) 
    {
        try
        {
            const passportDetails =
            {
                passportNumber: data.passportNumber,
                countryOfIssue: data.countryOfIssue,
                dateOfIssue: new Date(data.dateOfIssue),
                dateOfExpiry: new Date(data.dateOfExpiry)
            }

            const rentalDetails = 
            {
                address:
                {
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    zipcode: data.zipcode
                },
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                monthlyRent: data.monthlyRent
            }

            const personalDetails =
            {
                accountDetails: id,
                firstname: data.firstname,
                lastname: data.lastname,
                gender: data.gender,
                dateOfBirth: new Date(data.dateOfBirth),
                occupation: data.occupation,
                annualIncome: data.annualIncome,
                organisation: data.organisation,
                isPEP: data.isPEP
            }

            const url = '/api/personal'
            const response = await axios.post(url, {personalDetails, passportDetails, rentalDetails})
            toast(response.data.message);
        }
        catch(error)
        {
            toast(error)
        } 
    }

    return(
    <Form {...form} className="w-full lg:w-2/3">
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
    
    <h1 className="text-lg font-bold border-b pb-2">Personal Details</h1> 
    
    <div className="w-full flex flex-col lg:flex-row gap-4">
        <FormField
        control={form.control}
        name="firstname"
        render={({ field }) => (
	    <FormItem className="w-full lg:w-1/2">
	        <FormLabel>Firstname</FormLabel>
	        <FormControl>
		    <Input placeholder="" {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

        <FormField
        control={form.control}
        name="lastname"
        render={({ field }) => (
	    <FormItem className="w-full lg:w-1/2">
	        <FormLabel>Lastname</FormLabel>
	        <FormControl>
		    <Input placeholder="" {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

        
    </div>

    <div className="w-full flex flex-col lg:flex-row gap-4">
    
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="w-full lg:w-1/2">
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
	    <FormItem className="w-full lg:w-1/2">
	        <FormLabel>Date of Birth</FormLabel>
	        <FormControl>
		    <Input type="date" {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

        
    </div> 

    <div className="w-full flex flex-col lg:flex-row gap-4">

        <FormField
        control={form.control}
        name="occupation"
        render={({ field }) => (
	    <FormItem className="w-full lg:w-1/2">
	        <FormLabel>Occupation</FormLabel>
	        <FormControl>
		    <Input placeholder="" {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>

      <FormField
        control={form.control}
        name="annualIncome"
        render={({ field }) => (
	    <FormItem className="w-full lg:w-1/2">
	        <FormLabel>Annual Income ($)</FormLabel>
	        <FormControl>
		    <Input placeholder="" {...field} />
	        </FormControl>
	        <FormMessage />
	    </FormItem>)}/>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4">
        <FormField
          control={form.control}
          name="organisation"
          render={({ field }) => (
            <FormItem className="w-full lg:w-1/2">
              <FormLabel>Select Organisation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                {entities && <SelectContent>
                {entities.map((entity)=>
                (
                    <SelectItem value={entity._id}>{entity.name}</SelectItem>
                ))}
                </SelectContent>}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isPEP"
          render={({ field }) => (
            <FormItem className="w-full lg:w-1/2">
              <FormLabel>Is Politically Exposed Person</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>

    


    <h1 className="text-lg font-bold border-b pb-2">Passport Details</h1>

    <div className="w-full flex flex-col lg:flex-row gap-4">
        <FormField
        control={form.control}
        name="passportNumber"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/2">
            <FormLabel>Passport No.</FormLabel>
            <FormControl>
            <Input {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>

        <FormField
        control={form.control}
        name="countryOfIssue"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/2">
            <FormLabel>Country of issue</FormLabel>
            <FormControl>
            <Input {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>
    </div>

    <div className="w-full flex flex-col lg:flex-row gap-4">
        <FormField
        control={form.control}
        name="dateOfIssue"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/2">
            <FormLabel>Date of issue</FormLabel>
            <FormControl>
            <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>

        <FormField
        control={form.control}
        name="dateOfExpiry"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/2">
            <FormLabel>Date of expiry</FormLabel>
            <FormControl>
            <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem> )}/>
    </div>
    
    
    <h1 className="text-lg font-bold border-b pb-2 mt-6">Rental Agreement</h1>      

    <div className="w-full flex flex-col lg:flex-row gap-4">
        <FormField
        control={form.control}
        name="monthlyRent"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/3">
            <FormLabel>Monthly rent</FormLabel>
            <FormControl>
            <Input {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>

        <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/3">
            <FormLabel>Start date</FormLabel>
            <FormControl>
            <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>

        <FormField
        control={form.control}
        name="endDate"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/3">
            <FormLabel>End date</FormLabel>
            <FormControl>
            <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem> )}/>
    </div>

    <div className="w-full flex flex-col lg:flex-row gap-4">
        <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/2">
            <FormLabel>Street</FormLabel>
            <FormControl>
            <Input {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>

        <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/2">
            <FormLabel>City</FormLabel>
            <FormControl>
            <Input {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>
    </div>
          
    <div className="w-full flex flex-col lg:flex-row gap-4">
        <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/3">
            <FormLabel>State</FormLabel>
            <FormControl>
            <Input {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>

        <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/3">
            <FormLabel>Country</FormLabel>
            <FormControl>
            <Input {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>

        <FormField
        control={form.control}
        name="zipcode"
        render={({ field }) => (
        <FormItem className="w-full lg:w-1/3">
            <FormLabel>Zipcode</FormLabel>
            <FormControl>
            <Input {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>)}/>
    </div>

    <Button type="submit">Submit</Button>
    </form>
    </Form>
    )
}

export default PersonalDetails