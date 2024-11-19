import dbConnect from "@/dbConfig/dbConnect";
import entityService from "@/services/entity.service";
import { NextResponse } from "next/server";
const entityInstance = new entityService();
import accountService from "@/services/account.service";
const accountInstance = new accountService();

export async function POST(req)
{
    try
    {
        await dbConnect();
        const entityDetails = await req.json();

        const entity = await entityInstance.createEntity(entityDetails);
        if(!entity)
            return NextResponse.json({message: 'Failed to create an entity'})

        await accountInstance.updateEntity(entityDetails.accountDetails, entity._id.toString())
        console.log('KYC Completed')
        return NextResponse.json({message: 'KYC Completed'})
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
        const entities = await entityInstance.getEntities();
        return NextResponse.json(entities);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message})
    }
}