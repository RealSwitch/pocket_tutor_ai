import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  let isLoggedIn = false;
  if (sessionCookie) {
    try {
      isLoggedIn = JSON.parse(sessionCookie.value).isLoggedIn;
    } catch (e) {
      // Invalid cookie
    }
  }

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
  
  // This matches all routes inside the (app) group
  const isProtectedPage = !isAuthPage;

  if (isProtectedPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
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
