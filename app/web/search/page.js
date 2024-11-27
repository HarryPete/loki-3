'use client'

import { Button } from "@/components/ui/button";
import axios from "axios";
import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import fintsAD from '../../../assets/fintsAD.jpg'

const Search = ()  =>
{
    const params = useSearchParams();
    const [ loading, setLoading ] = useState(true)
    const query = params.get('q') || null
    const [ articles, setArtcles ] = useState(null);
    const [ search, setSearch ] = useState('');
    const router = useRouter();

    useEffect(()=>
    {
        if(query)
            getArticles();
    },[])

    useEffect(()=>
    {
        if(query)
            getArticles();
    },[query])

    async function getArticles()
    {
        try
        {
            const url = `/api/article`
            const response = await axios.get(url);
            const articles = response.data
            const topArtcles = articles.sort((a,b)=> new Date(b.date) - new Date(a.date)).slice(0,4)
            const options = 
            {
                keys: ['title', 'introduction', 'keywords', 'body', 'footer'],
                threshold: 0.3,
            };

            const fuse = new Fuse(articles, options);
            const result = fuse.search(query)

            if (result.length > 0) 
            {
                const filteredArticles = result.map(item => item.item);
                setArtcles(filteredArticles.concat(topArtcles));
            } 
            else 
            {
                console.log("No matches found.");
            }
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
        return

    return(
        <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
                <input placeholder="Search" className="border border-gray-400 p-3 lg:w-[50vw] w-full rounded-lg" onChange={(e)=> setSearch(e.target.value)}/>
                <Button className="p-6 text-lg" onClick={()=> router.push(`/web/search?q=${search}`)}>Search</Button>
            </div>
            {articles?.length && <p className="text-gray-400 mb-6">{articles.length*13} searches in 2 sec</p>}
            <div className="flex gap-4">
            {articles ? 
            <div className="flex lg:flex-col gap-8">
                {articles.map((article)=>
                (
                    <div key={articles._id} className="flex flex-col gap-2 lg:w-[60vw] w-full">
                        <Link href={`/web/fincle/${article.title}`} className="text-blue-500 text-xl font-semibold">{article.title}</Link>
                        <p><span className="text-gray-400">{new Date(article.date).toLocaleDateString()} - </span>{article.introduction}</p>
                    </div>
                ))}
            </div> : <p className="text-gray-400 text-3xl lg:w-[60vw] w-full h-[30vh] flex items-center justify-center">No search found</p>}
            <Image src={fintsAD} alt='AD' className="w-[30vw] h-full rounded"/>
            </div>
        </div>
    )
}

const Loader = () =>
{
    return(
        <div>
            <Suspense fallback={<>Loading...</>}>
                <Search/>
            </Suspense>
        </div>
    )
}

export default Loader