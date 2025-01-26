import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Check if the request is for a static asset
  const isStaticAsset =
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.match(/\.(svg|png|jpg|jpeg|gif|ico)$/);

  if (isStaticAsset) {
    return NextResponse.next();
  }
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("token", token);

  if (!token && !request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  } else if (token && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
