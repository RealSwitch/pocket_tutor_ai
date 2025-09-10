
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  const isPublicPath = pathname === '/login' || pathname === '/signup';

  // If there's no session cookie and the user is not on a public path, redirect to login
  if (!sessionCookie && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If there is a session cookie and the user is on a public path, redirect to home
  if (sessionCookie && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }
 
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
