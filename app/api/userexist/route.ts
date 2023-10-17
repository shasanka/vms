import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const POST =async(req:NextRequest)=>{
    try{
        const body = await req.json();
        const {email} = body;

        await connectMongoDB();
        const user = await User.findOne({email}).select('_id');
        console.log('user:', user)
        return NextResponse.json({user})
    }catch(E){
        console.log('Error:', E);
    }
}