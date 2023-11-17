import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;


    if (req.nextauth.token?.role === 'ROLE_RECEPTION') {
        return NextResponse.rewrite(`${origin}/entry`)
    }
    if (req.nextauth.token?.role === 'ROLE_SECURITY') {
        return NextResponse.rewrite(`${origin}/visitor`)
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = { matcher: ["/((?!register|api|$).*)"] };
