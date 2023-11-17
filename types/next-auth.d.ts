import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      role: string[];
      accessToken: string;
    };
  }
  interface Token {
    name: string;
    email: string;
    picture?: string;
    roles: string[];
    // Add other properties as needed
  }
}
