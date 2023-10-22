
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import StateModel from "@/models/state";
import { ObjectId } from "mongoose";
import DistrictModel from "@/models/district";



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

    // return NextResponse.json({ data: [] }, { status: 200 })

    const state = req.nextUrl.searchParams.get('state')!
    try {
        await connectMongoDB();

        const stateDocument = await StateModel.findOne({ name: state.toUpperCase() })
        if (!stateDocument) {
            return NextResponse.json({ data: 'State not found' }, { status: 404 });
        }

        if (!stateDocument.districtsID || stateDocument.districtsID.length === 0) {
            return NextResponse.json({ data: 'No districts found for the state' }, { status: 404 });
        }

        const districtIDs = stateDocument.districtsID;
        const districts = await DistrictModel.find({ _id: { $in: districtIDs } });

        const districtDetails = districts.map((district: DistrictType) => ({
            _id: district._id.toString(),
            name: district.name,
        }));

        return NextResponse.json({ data: districtDetails }, { status: 200 });

    } catch (E) {
        console.log(E)
        return NextResponse.json({ data: 'Server error' }, { status: 5400 });
    }

}

