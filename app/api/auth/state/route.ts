import StateModel from "@/models/state";
import { NextResponse } from "next/server";
import { saveStates, transformedData } from "../district/utils";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET() {
    try {

        await connectMongoDB()
        // const states = await StateModel.find({}, 'name');
        const allStates = await StateModel.find({}, 'name id');
        // const stateNames = states.map((state) => state.name);
        // await saveStates()
        return NextResponse.json({ data: allStates }, { status: 200 });
        // return NextResponse.json({ data: '' }, { status: 200 });
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

}