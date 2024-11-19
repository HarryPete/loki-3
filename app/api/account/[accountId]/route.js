import dbConnect from "@/dbConfig/dbConnect";
import accountService from "@/services/account.service";
import { NextResponse } from "next/server";
const accountInstance = new accountService();

export async function GET(req, { params })
{
    try
    {
        await dbConnect();
        const { accountId } = params;
        const account = await accountInstance.getAccountById(accountId);
        return NextResponse.json(account);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

export async function DELETE(req, { params })
{
    try
    {
        await dbConnect();
        const { accountId } = params;
        await accountInstance.deleteAccount(accountId);
        return NextResponse.json({message: 'Account deleted'})
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}

