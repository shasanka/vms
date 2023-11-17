import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl
    console.log("🚀 ~ file: middleware.ts:10 ~ middleware ~ req.nextauth.token?.role:", req.nextauth.token?.role)
    if (pathname === '/home' && req.nextauth.token?.role!== 'ROLE_ADMIN' ) {
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
