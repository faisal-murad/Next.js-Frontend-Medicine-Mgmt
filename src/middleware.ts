import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Method 1: JWT Token Validation (recommended)
export async function middleware(request: NextResponse) {
  const token = request.cookies.get("token")?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Optional: Check token expiration or other claims
    if (payload.exp && payload.exp < Date.now() / 1000) {
      // Token expired
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }

    // Token is valid, continue to protected route
    return NextResponse.next();
    
  } catch (error) {
    // Invalid token
    console.error("Token validation failed:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}