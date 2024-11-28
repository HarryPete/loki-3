'use client'

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import ArticleForm from "../components/ArticleForm"
import axios from "axios"
import ArticleCard from "../components/Article"
import { useRouter } from "next/navigation"
import Loader from "../components/Loader"

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
            console.log(error)
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
            <h2 className="text-red-700 font-bold text-5xl mt-12">360 Fints</h2>
            <input placeholder="Search" className="border border-gray-400 p-3 lg:w-[50vw] w-full rounded-lg" onChange={(e)=> setSearch(e.target.value)}/>
            <Button className="p-6 text-lg" onClick={()=> router.push(`/web/search?q=${search}`)}>Search</Button>
            {/* <Button className="absolute left-[5vw] top-24 p-4" onClick={()=> setShowArticleForm(true)}>New Article</Button> */}
            <h1 className="w-full text-start text-2xl font-bold mt-4 text-red-600">Trending</h1>
            {!loading && 
            <div className="w-full grid grid-cols-2 gap-4">
            {articles.map((article)=>
            (
                <ArticleCard article={article} key={article._id}/>
            ))}
            </div>}
            
            {showArticleForm && 
            <div className="h-[100vh] w-full fixed left-0 top-0 flex items-center justify-center" style={{backgroundColor:'rgba(0,0,0,0.7'}}>
                <ArticleForm getArticles={getArticles} setShowArticleForm={setShowArticleForm}/>
            </div>
            }
        </div>
    )
} 

export default Web