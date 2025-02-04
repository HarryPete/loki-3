'use client'

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import ArticleForm from "../components/ArticleForm"
import axios from "axios"
import ArticleCard from "../components/Article"
import { useRouter } from "next/navigation"
import Loader from "../components/Loader"
import { toast } from "sonner"
import Image from "next/image"
import logo from '../../assets/logo.png'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const Web = () =>
{
    const [ showArticleForm, setShowArticleForm ] = useState(false);
    const [ search, setSearch ] = useState('')
    const [ articles, setArticles ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const router = useRouter();

    useEffect(()=>
    {
        getArticles();
    },[])

    const getArticles = async () =>
    {
        try
        {
            const url = '/api/article'
            const response = await axios.get(url);
            const recentArticles = response.data.sort((a,b)=> new Date(b.date) - new Date(a.date)).slice(0,4);
            setArticles(recentArticles);
        }
        catch(error)
        {
            toast.error(error.message)
        }
        finally
        {
            setLoading(false)
        }
    }

    if(loading)
        return <Loader/>
    

    return(
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
            <Image className="h-14 w-fit" src={logo} alt='Fints 360'/>
            <input placeholder="Search" className="border border-gray-400 p-3 lg:w-[50vw] w-full rounded-lg" onChange={(e)=> setSearch(e.target.value)}/>
            <Button className="p-5" onClick={()=> router.push(`/web/search?q=${search}`)}>Search</Button>
                {/* <Dialog>
                      <DialogTrigger asChild>
                      <Button className='absolute top-20 left-[5vw]'>New Article</Button>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Article</DialogTitle>
                        <DialogDescription>
                            Publish your new article here
                        </DialogDescription>
                    </DialogHeader>
                    <ArticleForm getArticles={getArticles} setShowArticleForm={setShowArticleForm}/>
                    </DialogContent>
                </Dialog> */}
            
            <h1 className="w-full text-start text-xl font-bold mt-4">Trending</h1>
            
            <div className="w-full grid md:grid-cols-2  grid-cols-1 gap-4">
            {articles.map((article)=>
            (
                <ArticleCard article={article} key={article._id}/>
            ))}
            </div>
        </div>
    )
} 

export default Web