import NextAuth from "next-auth"
import { cookies } from "next/headers"
import { encode, decode } from 'next-auth/jwt'
import { NextResponse } from "next/server";
import { authRoutes, userRoutes } from "./routes";

export default async function middleware(req)
{
    const { nextUrl } = req;
    const token = await cookies();
    const cookie = token?.get('__Secure-authjs.session-token');
    
    let user = null;
    if(cookie)
    {
        user = await decode({
            token: cookie.value,
            salt: cookie.name,
            secret: process.env.AUTH_SECRET
        })
    } 

    const userRoute = userRoutes.some((route)=> nextUrl.pathname.startsWith(route));
    const authRoute = authRoutes.some((route)=> nextUrl.pathname.startsWith(route));

    if(user?.role === 'visitor' || !user )
        if(userRoute)
            return NextResponse.redirect(new URL('/login', nextUrl))

    if(user?.role === 'visitor' && authRoute )
        return NextResponse.redirect(new URL('/', nextUrl))

    if(user?.role=== 'user' && authRoute)
    {
        if(authRoute)
            return NextResponse.redirect(new URL('/home', nextUrl))
    }

    return null
}

export const config = 
{
    matcher: ['/((?! .+\\. [\\w]+$ |_next).*)', '/', '/(api|trpc) (.*)']
} 