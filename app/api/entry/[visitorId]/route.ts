import { connectMongoDB } from "@/lib/mongodb";
import Entry from "@/models/entry";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { visitorId: number } }
) {
  await connectMongoDB();
  try {
    const entries = await Entry.find({
      visitorId: params.visitorId,
    });

    // If the entry was found, return a success response with the entry data
    if (entries) {
      return NextResponse.json(
        { message: "found", data: entries },
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
