import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string, password: string };

                if (!email || !password) {
                    return NextResponse.json({ error: 'Invalid data' }, { status: 422 })
                }

                try {
                    await connectMongoDB()
                    const user = await User.findOne({ email })
                    if (!user) return NextResponse.json({ error: 'Error in credentials' }, { status: 500 });

                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if (!passwordMatch) return NextResponse.json({ error: 'Error in credentials' }, { status: 500 })

                    return user
                } catch (E) {
                    // return null
                    console.log(E)
                    return NextResponse.json({ error: 'Error in credentials' }, { status: 500 })
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        jwt({ token, user, session }) {
            return token
        },
        session({ session, token, user }) {
            return session
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }