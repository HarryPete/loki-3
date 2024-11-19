import dbConnect from "@/dbConfig/dbConnect";
import accountService from "@/services/account.service";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const accountInstance = new accountService();

export async function POST(req)
{
    const session = await mongoose.startSession();
    session.startTransaction();

    try
    {
        await dbConnect();
        const accounts = await accountInstance.getAccounts();
        for(let account of accounts)
        {
            let accountName = ""
            if(account.type === "Entity")
                accountName = account.entityDetails.name
            else
                accountName = account.personalDetails.firstname +' ' +account.personalDetails.lastname

            await accountInstance.updateAccountName(account._id, accountName);
        }

        return NextResponse.json({message: 'Updated successfully'})
    }
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({error: error.message})
    }
}
