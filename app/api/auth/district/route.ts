import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const d = req.nextUrl.searchParams
    console.log(d.get('data'))
    return NextResponse.json({ message: 'GO it' }, { status: 200 })
}

