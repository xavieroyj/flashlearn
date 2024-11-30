import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";
 
export default async function middleware(request: NextRequest) {
    // Get the absolute URL for the current request
    const baseUrl = request.nextUrl.origin;
    
    const { data: session } = await betterFetch<Session>(
        `${baseUrl}/api/auth/get-session`,
        {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        },
    );
 
    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};