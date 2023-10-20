
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import StateModel from "@/models/state";
import { ObjectId } from "mongoose";



export type DistrictType = {
    _id: string;
    name: string;
    // Add other fields if needed
};
export type StateType = {
    _id?: ObjectId,
    name: string,
    districtsID: DistrictType[],
}
export async function GET(req: NextRequest) {

    const state = req.nextUrl.searchParams.get('state')!
    try {
        await connectMongoDB();

        const states = await StateModel.findOne({ name: state.toUpperCase() }).populate('districtsID')
        const districtDetails = states.districtsID.map((district: DistrictType) => ({
            _id: district._id.toString(),
            name: district.name,
        }));

        return NextResponse.json({ data: districtDetails }, { status: 200 });

    } catch (E) {
        console.log(E)
    }

}

