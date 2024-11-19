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
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

const FormSchema = z.object({
    name: z.string().min(6,{
      message: "Enter valid name",
    }),
    incorporationDate: z.string().min(8,{
      message: "Enter valid date"
    }),
    industry: z.string().min(3,{
      message: "Enter valid industry",
    }),
    industryRating: z.string().min(1).max(10,{
      message: "Enter valid rating"
    }),
    product: z.string().min(4,{
      message: "Enter valid product",
    }),
    productRating: z.string().min(1).max(10,{
      message: "Enter valid rating"
    }),
    region: z.string().min(3,{
      message: "Enter valid region",
    }),
    regionRating: z.string().min(1).max(10,{
      message: "Enter valid rating"
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
    zipcode: z.string().min(4,{
      message: "Enter valid zipcode"
    })
  })
  

const EntityDetails = ({id}) =>
{
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: 
        {
            name: "",
            incorporationDate: "",
            industry: "",
            industryRating: "",
            product: "",
            productRating: "",
            region: "",
            regionRating: "",
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
            const personalData = 
            { 
              accountDetails: id,
              name: data.name, 
              incorporationDate: new Date(data.incorporationDate), 
              industry: data.industry,
              industryRating: data.industryRating,
              product: data.product,
              productRating: data.productRating,
              region: data.region,
              regionRating: data.regionRating,
              address:
              {
                street: data.street,
                city: data.city,
                state: data.state,
                country: data.country,
                zipcode: data.zipcode,
              },
            }

            const url = '/api/entity'
            const response = await axios.post(url, personalData)
            console.log(response);
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
  
          <h1 className="text-lg font-bold border-b pb-2">Entity Details</h1>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="incorporationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Incorporation date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-col lg:flex-row md:flex-row md gap-4">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/6 md:w-1/2">
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <FormField
            control={form.control}
            name="industryRating"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/6 md:w-1/2">
                <FormLabel>Industry rating</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/6 md:w-1/2">
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productRating"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/6 md:w-1/2">
                <FormLabel>Product rating</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/6 md:w-1/2">
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="regionRating"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/6 md:w-1/2">
                <FormLabel>Region rating</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>  

          <h1 className="text-lg font-bold border-b pb-2">Address</h1>      

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
              </FormItem>
            )}
          />

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
              </FormItem>
            )}
          />
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-4">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/2">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              </FormItem>
            )}
          />

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
              </FormItem>
            )}
          />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}

export default EntityDetails