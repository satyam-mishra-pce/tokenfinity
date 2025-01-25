import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"


// export async function middleware(request: NextRequest) {
//   // Check if the request is for a static asset
//   const isStaticAsset =
//     request.nextUrl.pathname.startsWith("/_next") ||
//     request.nextUrl.pathname.match(/\.(svg|png|jpg|jpeg|gif|ico)$/);

//   // If it's a static asset, allow the request to proceed
//   if (isStaticAsset) {
//     return NextResponse.next();
//   }
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
//   console.log("token", token)

//   if (!token && !request.nextUrl.pathname.startsWith("/auth")) {
//     return NextResponse.redirect(new URL("/auth", request.url))
//   }
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }


export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = request.nextUrl

  // Allow access to authentication routes
  if (pathname.startsWith("/api/auth") || pathname === "/auth") {
    return NextResponse.next()
  }

  // Redirect to /auth if accessing a protected route without a token
  if (!token && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // Allow access if authenticated
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


