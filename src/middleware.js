import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export const runtime = "nodejs";   // 🔥 IMPORTANT

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const decoded = getDataFromToken(request);
  const role = decoded?.role;

  // More robust matching for protected paths like /cart and /orders (not just equality or trailing slash)
  const protectedPatterns = [
    /^\/$/,                   // home
    /^\/shop(\/|$)/,          // /shop or subpaths
    /^\/product(\/|$)/,       // /product or subpaths
    /^\/admin(\/|$)/,         // /admin or subpaths
    /^\/cart(\/|$)/,          // /cart or subpaths
    /^\/orders(\/|$)/,         // /orders or subpaths

  ];

  const isProtected = protectedPatterns.some((regex) => regex.test(path));
  
  if (!decoded && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If a logged-in normal user tries to access any admin route, redirect to home
  if (role === "user" && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If an admin tries to access a non-admin route (other than logout or login/register), redirect to admin dashboard
  if (
    role === "admin" && 
    !path.startsWith("/admin") && 
    path !== "/login" && 
    path !== "/register"
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/admin", 
    "/login", 
    "/register", 
    "/shop", 
    "/shop/:path*", 
    "/product/:id*", 
    "/cart", 
    "/cart/:path*", 
    "/orders", 
    "/orders/:path*"
  ],
};
