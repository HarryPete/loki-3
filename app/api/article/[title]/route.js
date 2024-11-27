import dbConnect from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import articleService from "@/services/article.service";
const articleInstance = new articleService();
import accountService from "@/services/account.service";
import mongoose from "mongoose";
const accountInstance = new accountService();

export async function GET(req, {params})
{
    try
    {
        await dbConnect();

        const { title } = params;
        const searchTitle = title.split('%').join(' ');
        const article = await articleInstance.getArticleByTitle(searchTitle);
        return NextResponse.json(article);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function POST(req, {params})
{
    const session = await mongoose.startSession();
    session.startTransaction();

    try
    {
        await dbConnect();

        const { title } = params;
        const { associations } = await req.json();
        const searchTitle = title.split('%').join(' ');
        const article = await articleInstance.getArticleByTitle(searchTitle);
        const articleId = article._id.toString()
        
        for(let association of associations)
        {
            await articleInstance.updateAssociation(articleId, association);
            await accountInstance.updateAssociation(association, articleId);
        }

        return NextResponse.json(article);
    }
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({error: error.message})
    }
}