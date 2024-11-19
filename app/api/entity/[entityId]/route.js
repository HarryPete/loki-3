import dbConnect from "@/dbConfig/dbConnect";
import entityService from "@/services/entity.service";
import { NextResponse } from "next/server";
const entityInstance = new entityService();

export async function PUT(req, {params})
{
    try
    {
        await dbConnect();
        const { buyers, sellers } = await req.json();
        const { entityId } = params;

        await entityInstance.updateMOA(entityId, buyers, sellers);
        return NextResponse.json({message: 'MOA Updated'})
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