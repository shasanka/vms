import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@email.com" },
                password: { label: "Password", type: "password", placeholder: 'Password' }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password
                if (!email || !password) {
                    return null
                }

                try {
                    await connectMongoDB()
                    const user = await User.findOne({ email })
                    if (!user) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if (!passwordMatch) return null

                    return user
                } catch (E) {
                    console.log('Error connecting to database', E)
                    return null
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
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }