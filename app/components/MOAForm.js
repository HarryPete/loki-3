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


  

const MOAForm = ({account}) =>
{

    const [ entities, setEntities ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ buyers, setBuyers ] = useState([]);
    const [ sellers, setSellers ] = useState([]);

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
            setLoading(false);
        }
        catch(error)
        {
            toast(error);
            setLoading(false);
        }
    }

    async function updateMOA()
    {
        try
        {
            const url = `/api/entity/${account.entityDetails._id}`;
            await axios.put(url, {buyers, sellers});
        }
        catch(error)
        {
            toast(error);
            setLoading(false);
        }
    }

    if(loading)
        return <>Loading</>

    return(
        <div className="w-[60vw] bg-white p-8 rounded">
            <h1 className="mb-4">Buyers</h1>

            <div className="flex flex-wrap gap-2 mb-4">
                        {entities.map((entity)=>
            (
                <p className={`p-1 rounded text-xs cursor-pointer ${buyers.length ? (buyers.includes(entity._id) ? "bg-green-600" : " bg-gray-400") :  "bg-gray-400"}`} onClick={()=> setBuyers((prev)=> [...prev, entity._id])}>{entity.name}</p>
            ))}
            </div>
            <h1 className="mb-4">Sellers</h1>
            <div className="flex flex-wrap gap-2 mb-4">
            
            {entities.map((entity)=>
            (
                <p className={`p-1 rounded text-xs cursor-pointer ${buyers.length ? (sellers.includes(entity._id) ? "bg-red-600" : " bg-gray-400") :  "bg-gray-400"}`} onClick={()=> setSellers((prev)=> [...prev, entity._id])}>{entity.name}</p>
            ))}
            </div>
            <button className="p-2 rounded border" onClick={updateMOA}>Update MOA</button>
        </div>
    )
}

export default MOAForm