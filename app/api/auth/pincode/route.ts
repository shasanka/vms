import DistrictModel from "@/models/district";
import { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export type PincodeType = {
    name: string;
    pincodes: number[];
    _id: ObjectId
}
export async function GET(req: NextRequest) {
    try {
        const districtID = req.nextUrl.searchParams.get('districtID');
        const pincodes = await DistrictModel.findById(districtID);
        return NextResponse.json({ data: pincodes }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

}