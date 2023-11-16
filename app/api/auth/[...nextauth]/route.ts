
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions: AuthOptions = {
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
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signin`,
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
        return { ...token, ...user };
      }
      return token;
    },
    session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
