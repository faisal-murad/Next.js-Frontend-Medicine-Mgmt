import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get("token")?.value;
  // console.log("🚀 ~ middleware ~ token:", token)

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // try {


  //   console.log("process.env.NEXT_PUBLIC_JWT_SECRET ===",process.env.JWT_SECRET)

  //   const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  //   console.log("🚀 ~ middleware ~ secret:", secret)
  //   const { payload } = await jwtVerify(token, secret);
  //   console.log("🚀 ~ middleware ~ payload:", payload)

  //   if (payload.exp && payload.exp < Date.now() / 1000) {
  //     const response = NextResponse.redirect(new URL("/login", request.url));
  //     response.cookies.delete("token");
  //     return response;
  //   }
1
    return NextResponse.next();
  // } catch (error) {
  //   console.error("Token validation failed:", error);
  //   const response = NextResponse.redirect(new URL("/login", request.url));
  //   response.cookies.delete("token");
  //   return response;
  // }
}

// ✅ Only run middleware on protected routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    // Add more protected routes here
  ],
};
