import { NextResponse, NextRequest } from 'next/server'
import Entry from '@/models/entry'
import mongoose from 'mongoose'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!mongoose.Types.ObjectId.isValid(body.visitorId)) {
      // Check if the provided visitorId is a valid ObjectId
      return NextResponse.json({ message: 'Invalid visitorId' ,data:null}, { status: 400 });
    }
    const entry = new Entry({ visitorId:new mongoose.Types.ObjectId(body.visitorId)});
    await entry.save();
    return NextResponse.json({ message: 'Entry Added successfully', data: entry}, { status: 201 })
  } catch (E) {
    console.log(E)
    return NextResponse.json({ message: 'Error occured while registering user' }, {
      status: 500
    })
  }
}
