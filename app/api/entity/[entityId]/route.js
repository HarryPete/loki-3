import dbConnect from "@/dbConfig/dbConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

import entityService from "@/services/entity.service";
const entityInstance = new entityService();
import partnerService from "@/services/partner,service";
const partnerInstance = new partnerService();
import personalService from "@/services/personal.service";
const personalInstance = new personalService();

export async function PUT(req, {params})
{
    const session = await mongoose.startSession();
    session.startTransaction();

    try
    {
        await dbConnect();
        const partnerDetails = await req.json();
        const { entityId } = params;

        const details = {...partnerDetails, entity: entityId}
        const partner = await partnerInstance.createPartnership(details);
        await personalInstance.updatePartnership(partnerDetails.profile, partner._id.toString());
        await entityInstance.updatePartnership(entityId, partner._id.toString());
        return NextResponse.json({message: 'Trade Licence Updated'})
    }
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();
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
        const { buyers, sellers } = await req.json();
        const { entityId } = params;
        await entityInstance.updateMOA(entityId, buyers, sellers);

        for(let buyer of buyers)
        {
            await entityInstance.addSeller(buyer, entityId)
        }

        for(let seller of sellers)
        {
            await entityInstance.addBuyer(seller, entityId)
        }

        return NextResponse.json({message: 'MOA Updated'})
    }
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();
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