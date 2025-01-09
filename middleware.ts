import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";
 
export default async function authMiddleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				//get the cookie from the request
				cookie: request.headers.get("cookie") || "",
			},
		},
	);
 
	const isAuthRoute = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register';
	const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

	// If user is not logged in and trying to access protected routes
	if (!session && isDashboardRoute) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// If user is logged in and trying to access auth routes
	if (session && isAuthRoute) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}
 
export const config = {
	matcher: ["/login", "/register", "/dashboard/:path*"],
};