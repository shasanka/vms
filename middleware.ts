import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { pathname, origin } = req.nextUrl
    if (pathname === '/home' && !req.nextauth.token?.roles.includes('ROLE_ADMIN')) {
        return NextResponse.redirect(`${origin}/entry`)
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = { matcher: ["/((?!register|api|$).*)"] };
