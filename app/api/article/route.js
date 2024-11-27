import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary' 
import articleService from "@/services/article.service";
const articleInstance = new articleService();

export async function POST(req)
{
    try
    {
        await dbConnect();

        const articleDetails = await req.json();

        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const result = await cloudinary.uploader.upload(articleDetails.coverImage);
        console.log(articleDetails)
        const updatedDetails = {...articleDetails, coverImage: result.url}
        console.log(updatedDetails)
        await articleInstance.createArticle(updatedDetails)
                
        return NextResponse.json({message: 'Article published'})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function GET()
{
    try
    {
        await dbConnect();
        const articles = await articleInstance.getArticles();
        return NextResponse.json(articles);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}