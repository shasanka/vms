import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = body
    const hashedPassword = await bcrypt.hash(password, 10);


    await connectMongoDB();
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }
    await User.create({
      name, email, password: hashedPassword
    })
    return NextResponse.json({ message: 'User registered' }, { status: 201 })
  } catch (E) {
    console.log(E)
    return NextResponse.json({ message: 'Error occured while registering user' }, {
      status: 500
    })
  }
}
