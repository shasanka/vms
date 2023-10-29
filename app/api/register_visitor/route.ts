import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import Visitor from '@/models/visitor'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()


    await connectMongoDB();
    const newVisitor = await Visitor.create({
      phone_no: body.phone_no,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      address: body.address,
      state: body.state,
      district: body.district,
      pincode: body.pincode,
      id_proof_type: body.id_proof_type,
      id_proof_number: body.id_proof_number,
    })
    return NextResponse.json({ message: 'User registered' }, { status: 201 })
  } catch (E) {
    console.log(E)
    return NextResponse.json({ message: 'Error occured while registering user' }, {
      status: 500
    })
  }
}
