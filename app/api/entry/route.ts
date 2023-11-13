import { NextResponse, NextRequest } from "next/server";
import Entry from "@/models/entry";
import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!mongoose.Types.ObjectId.isValid(body.visitorId)) {
      // Check if the provided visitorId is a valid ObjectId
      return NextResponse.json(
        { message: "Invalid visitorId", data: null },
        { status: 400 }
      );
    }
    const entry = new Entry({
      visitorId: new mongoose.Types.ObjectId(body.visitorId),
    });
    await entry.save();
    return NextResponse.json(
      { message: "Entry Added successfully", data: entry },
      { status: 201 }
    );
  } catch (E) {
    console.log(E);
    return NextResponse.json(
      { message: "Error occured while registering user" },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest) {

  // Extract the ID from the request URL search parameters
  const visitorId = req.nextUrl.searchParams.get("id");

  // Establish a connection to the MongoDB database
  await connectMongoDB();
  try {
    
    const entries  = await Entry.find({
      visitorId: visitorId,
    });
    console.log("🚀 ~ file: route.ts:47 ~ GET ~ entries:", entries)

    // If the entry was found, return a success response with the entry data
    if (entries ) {
      return NextResponse.json(
        { message: "found", data: entries  },
        { status: 200 }
      );
    } else {
      // If the entry was not found, return a not found response
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }
  } catch (e) {
    // Handle any errors that occur during database operations
    console.error(e);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
