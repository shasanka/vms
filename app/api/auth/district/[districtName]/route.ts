import { connectMongoDB } from "@/lib/mongodb";
import DistrictModel from "@/models/district";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export type PincodeType = {
    name: string;
    pincodes: number[];
    _id: ObjectId
}
export async function GET(req: NextRequest,{ params }: { params: { districtName: string } }) {
    try {
        const district = params.districtName;
        await connectMongoDB()
        const pincodes = await DistrictModel.findOne({name:district});
        return NextResponse.json({ data: pincodes }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

}
