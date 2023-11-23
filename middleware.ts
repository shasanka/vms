import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    console.log("🚀 ~ file: middleware.ts:9 ~ middleware ~ pathname:", pathname)


    // if (req.nextauth.token?.role === 'ROLE_RECEPTION') {
    //     return NextResponse.rewrite(`${origin}/home/addvisitor`)
    // }
    if (req.nextauth.token?.role === 'ROLE_RECEPTION' && pathname.startsWith('/home')) {
      // Allow ROLE_SECURITY to go to any page that starts with '/home'
      return NextResponse.rewrite(`${origin}${pathname}`)
    }
    if (req.nextauth.token?.role === 'ROLE_SECURITY') {
        return NextResponse.rewrite(`${origin}/entry`)
    }
    if (req.nextauth.token?.role === 'ROLE_OFFICE') {
        return NextResponse.rewrite(`${origin}/entry`)
    }

    // return NextResponse.redirect('/auth/signin');
    
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = { matcher: ["/((?!register|api|$).*)"] };
