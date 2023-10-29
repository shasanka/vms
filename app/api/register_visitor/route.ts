import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Visitor from "@/models/visitor";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connectMongoDB();
    const foundVisitor = await Visitor.findOne({ phoneNo: body.phoneNo });
    if (foundVisitor) {
      return NextResponse.json({ message: "Duplicate user" }, { status: 409 });
    } else {
      const newVisitor = await Visitor.create({
        phoneNo: body.phoneNo,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        address: body.address,
        state: body.state,
        district: body.district,
        pincode: body.pincode,
        idProofType: body.idProofType,
        idProofNumber: body.idProofNumber,
      });
      return NextResponse.json(
        { message: "User registered", data: newVisitor },
        { status: 201 }
      );
    }
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
