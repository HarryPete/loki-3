import dbConnect from "@/dbConfig/dbConnect";
import userService from "@/services/user.service";
const userInstance = new userService();
import { NextResponse } from "next/server";

export async function GET(req, {params})
{ 
    try
    { 
        await dbConnect();
        const { userId } = await params;
        const user = await userInstance.getUserById(userId);
        return NextResponse.json(user)
    }  
    catch(error)
    { 
        return NextResponse.json({error: error.message})
    } 
}
