import { NextResponse, type NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token: JWTExtended | null = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (token?.user?.role === "admin") {
    if (pathname.startsWith("/member")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // if (token.user.status === "not_verified") {
    //   return NextResponse.redirect(new URL("/verify", req.url));
    // }
  }

  if (pathname.startsWith("/member")) {
    if (!token) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }
    if (pathname === "/member") {
      return NextResponse.redirect(new URL("/member/dashboard", req.url));
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"],
};
