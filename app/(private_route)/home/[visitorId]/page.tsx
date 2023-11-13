import { connectMongoDB } from "@/lib/mongodb";
import Entry from "@/models/entry";
import { NextResponse } from "next/server";
import React from "react";

const getEntries = async (visitorId: string) => {
  await connectMongoDB();
  try {
    const entries = await Entry.find({
      visitorId: visitorId,
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
};


const VisitorPageWithId = async ({
  params,
}: {
  params: { visitorId: string };
}) => {
  console.log("🚀 ~ file: page.tsx:13 ~ params.visitorId:", params.visitorId)
  const d = await getEntries(params.visitorId);
  const res = await d.json();
  console.log("🚀 ~ file: page.tsx:40 ~ res:", res.data[0].registrationTimestamp)
  return <>
  {
    res.data.map((val:any)=>val.createdAt)
  }
  </>
};

export default VisitorPageWithId;
