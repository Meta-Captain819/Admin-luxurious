import { NextResponse } from "next/server";

export function middleware(request) {
  // Retrieve the user token from cookies (adjust based on your auth setup)
  const token = request.cookies.get("token")?.value;

  // Define the paths that require authentication
  const protectedPaths = ["/dashboard", "/settings", "/orders", "/admin","/history"];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If the path is protected and no token exists, redirect to login
  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request to proceed if user is logged in or path is not protected
  return NextResponse.next();
}


