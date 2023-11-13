import VisitorsTable from "@/components/VisitorsTable";
import { IVisitor } from "@/interface/common";
import { connectMongoDB } from "@/lib/mongodb";
import Visitor from "@/models/visitor";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
async function getData() {
  try {
    await connectMongoDB();
    const visitors: IVisitor[] = await Visitor.find();
    return NextResponse.json(
      { message: "All users", data: visitors },
      { status: 200 }
    );
  } catch (E: any) {
    return NextResponse.json({ message: E.message }, { status: 500 });
  }
}

export default async function Home() {
const session = await getServerSession()
  console.log("🚀 ~ file: page.tsx:22 ~ Home ~ session:", session)
  const res = await getData();
  const jsonRes = await res.json();
  const visitors:IVisitor[] = jsonRes.data;
  return (
    <>
      <VisitorsTable visitors={visitors}/>
    </>
  );
}
