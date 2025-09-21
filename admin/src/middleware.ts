import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedRoutes, getSetupRoutes, ROUTES } from "@/shared/constants/routes";

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAuthenticated = request.cookies.get("token")?.value;
    const isSetupComplete = request.cookies.get("setup_complete")?.value;

    const requiresAuth = getAuthenticatedRoutes().some(route => pathname.startsWith(route));
    const isSetupRoute = getSetupRoutes().some(route => pathname.startsWith(route));
    
    if (!isSetupComplete && !isSetupRoute && isAuthenticated) {
        return NextResponse.redirect(new URL(ROUTES.SETUP.DB_CONNECTION, request.url));
    }

    if (isSetupRoute && isSetupComplete && !isAuthenticated) {
        return NextResponse.redirect(new URL(ROUTES.ADMIN.LOGIN, request.url));
    }

    if (requiresAuth && !isAuthenticated) {
        return NextResponse.redirect(new URL(ROUTES.ADMIN.LOGIN, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}