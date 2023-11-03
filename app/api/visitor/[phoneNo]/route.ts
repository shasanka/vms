import Visitor from "@/models/visitor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { phoneNo: number } }
) {
  const phoneNo = params.phoneNo;

  const visitor = await Visitor.findOne({ phoneNo });
  if (!visitor)
    return NextResponse.json(
      { message: "Requested resource not found", data:null },
      { status: 404 }
    );

  return NextResponse.json(
    { message: "Resource found", data: visitor },
    { status: 200 }
  );
}
