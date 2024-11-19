import dbConnect from "@/dbConfig/dbConnect";
import transactionService from "@/services/transaction.service";
const transactionInstance = new transactionService();
import accountService from "@/services/account.service";
import { NextResponse } from "next/server";
const accountInstance = new accountService();

export async function POST(req, {params}) 
{
    try
    {
        await dbConnect();
        const { transactionId } = params;
        const transactions = await transactionInstance.getAccountTransactionsById(transactionId);
        return NextResponse.json(transactions)
    }
    catch(error)
    {
        return NextResponse.json({message: error.message})
    }
}