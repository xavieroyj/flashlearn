import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";
 
// This function can be marked with `cache: 'force-cache'`, `cache: 'no-store'` or `revalidate: number`
export default async function authMiddleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
			// Prevent caching the auth request since session status can change
			cache: 'no-store',
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