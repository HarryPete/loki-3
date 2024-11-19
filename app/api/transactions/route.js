import dbConnect from "@/dbConfig/dbConnect";
import transactionService from "@/services/transaction.service";
const transactionInstance = new transactionService();
import accountService from "@/services/account.service";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
const accountInstance = new accountService();

export async function POST(req) 
{

    const session = await mongoose.startSession();
    session.startTransaction();
    
    try
    {
        await dbConnect();
        const { transactionDetails } = await req.json();
        const { primaryAccount, counterParty } = transactionDetails;
        const newTransaction = await transactionInstance.createTransaction(transactionDetails);
        await accountInstance.updateAccountTransaction(primaryAccount, newTransaction._id.toString());
        if(primaryAccount !== counterParty)
            await accountInstance.updateAccountTransaction(counterParty, newTransaction._id.toString())
        
        return NextResponse.json({message: 'Transaction successfull'})
    }
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({message: 'Transaction Failed'})
    }
}

export async function GET(req) 
{
   
    try
    {
        await dbConnect();
        const transactions = await transactionInstance.getAccountTransactions();        
        return NextResponse.json(transactions)
    }
    catch(error)
    {
        return NextResponse.json({message: 'Transaction Failed'})
    }
}