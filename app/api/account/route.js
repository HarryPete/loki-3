import dbConnect from "@/dbConfig/dbConnect";
import accountService from "@/services/account.service";
import { NextResponse } from "next/server";
const accountInstance = new accountService();

export async function POST(req)
{
    try
    {
        await dbConnect();
        const { type, email, contact } = await req.json();

        console.log(type, email, contact)

        const account = await accountInstance.createAccount(type, email, contact);
        if(!account)
            return NextResponse.json({message: 'Failed to create an account'})

        return NextResponse.json({message: 'Account created'})
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
        const accounts = await accountInstance.getAccounts();
        return NextResponse.json(accounts);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}