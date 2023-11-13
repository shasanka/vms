import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      username: string;
      email: string;
      role: string[];
      accessToken: string;
    };
  }
  //   interface User{

  //   }

  // interface User extends DefaultUser {
  //   role: string;
  //   username:string;
  //   accessToken:string
  // }
}
