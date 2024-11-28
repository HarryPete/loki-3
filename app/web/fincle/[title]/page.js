'use client'

import AssociationForm from "@/app/components/AssociationForm";
import Loader from "@/app/components/Loader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SearchArticle = ()  =>
{
    const [ loading, setLoading ] = useState(true)
    const [ article, setArtcle ] = useState(null);
    const [ associationForm, setAssociationForm ] = useState(false);
    const path = usePathname();
    const title = path.split('/')[3];
    console.log(title)

    useEffect(()=>
    {
        getArticle();
    },[])

    async function getArticle()
    {
        try
        {
            const url = `/api/article/${title}`
            const response = await axios.get(url);
            setArtcle(response.data)
        }
        catch(error)
        {
            toast(error);
        }
        finally
        {
            setLoading(false);
        }
    }

    if(loading)
        return <Loader/>

    return(
        <div className="w-full flex flex-col gap-4 text-lg">
            <h1 className="text-5xl font-bold leading-normal">{article.title}</h1>
            <Image className="w-[100vw] h-fit object-fill" src={article.coverImage} alt={article.title} width={500} height={200}/>
            <div className="flex flex-wrap gap-2">
            {article.keywords.split(' ').map((key, index)=>
            (
                <p key={index} className="bg-gray-400 p-1 rounded px-2">{key}</p>
            ))}
            </div>
            <p className="text-gray-400 text-md">Published on {new Date(article.date).toDateString()}</p>
            <p className="leading-loose">{article.introduction}</p>
            <p className="leading-loose">{article.body}</p>
            <p className="leading-loose">{article.footer}</p>

            {/* <Button className="mt-4 p-6 text-md w-full" onClick={()=> setAssociationForm(true)}>Update Association</Button>

            {associationForm && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
                <AssociationForm title={article.title} setAssociationForm={setAssociationForm}/>
            </div>} */}
        </div>
    )
}

export default SearchArticle