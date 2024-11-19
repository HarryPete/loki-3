import dbConnect from "@/dbConfig/dbConnect";
import personalService from "@/services/personal.service";
import { NextResponse } from "next/server";
const personalInstance = new personalService();
import accountService from "@/services/account.service";
const accountInstance = new accountService();
import passportService from "@/services/passport.service";
const passportInstance = new passportService();
import rentalService from "@/services/rental.service";
import mongoose from "mongoose";
const rentalInstance = new rentalService();

export async function POST(req)
{
    const session = await mongoose.startSession();
    session.startTransaction();

    try
    {
        await dbConnect();
        const { personalDetails, passportDetails, rentalDetails } = await req.json();

        const passportDetail = await passportInstance.createPassport(passportDetails);
        const rentalDetail = await rentalInstance.createRental(rentalDetails);
        const personal = await personalInstance.createPersonal(personalDetails);
        await personalInstance.updateDocuments(personal._id.toString(), passportDetail._id.toString(), rentalDetail._id.toString())
        await accountInstance.updatePersonal(personalDetails.accountDetails, personal._id.toString())
        return NextResponse.json({message: 'KYC Completed'})
    }
    catch(error)
    {
        await session.abortTransaction();
        session.endSession();

        return NextResponse.json({error: 'Transaction failed'})
    }
}

// export async function GET()
// {
//     try
//     {
//         await dbConnect();
//         const entities = await personalInstance.getEntities();
//         return NextResponse.json(entities);
//     }
//     catch(error)
//     {
//         return NextResponse.json({error: error.message})
//     }
// }