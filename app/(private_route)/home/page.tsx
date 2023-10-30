import VisitorsTable from "@/components/VisitorsTable";
import { IVisitor } from "@/interface/common";
import { connectMongoDB } from "@/lib/mongodb";
import Visitor from "@/models/visitor";
import { revalidateTag } from "next/cache";
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
  revalidateTag('visitors')
  const res = await getData();
  const jsonRes = await res.json();
  const visitors:IVisitor[] = jsonRes.data;
  return (
    <>
      <VisitorsTable visitors={visitors}/>
    </>
  );
}
