import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token");

  if (!token && url.pathname.startsWith("/user")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (token && url.pathname === "/") {
    url.pathname = "/user";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
