import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          return null;
        }

        try {
          const response = await fetch(
            "http://localhost:3001/api/v1/auth/signin",
            {
              method: "POST",
              body: JSON.stringify({
                email,
                password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const user = await response.json();
            return user;
          } else {
            console.error(`Authentication failed: ${response.statusText}`);
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    session({ session, token, user }) {
      console.log("🚀 ~ file: route.ts:71 ~ session ~ token:", token);
      //   return {...session, user:{
      //     ...session.user,
      //     username :user.username,
      //     accessToken :user.accessToken,
      //     roles : user
      //   }};

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
