export { default } from 'next-auth/middleware';


export const config = { matcher: ["/((?!register|api|login|$).*)"], }
// export const config = { matcher: ["/dashboard"] }