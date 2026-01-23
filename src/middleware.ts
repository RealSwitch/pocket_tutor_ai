
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  let isLoggedIn = false;

  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(sessionCookie);
      if (sessionData.isLoggedIn) {
        isLoggedIn = true;
      }
    } catch (error) {
      console.error('Could not parse session cookie in middleware:', error);
    }
  }

  const { pathname } = request.nextUrl;

  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If user is logged in and tries to access login/signup, redirect to home
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is NOT logged in and tries to access a protected route, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // The matcher is configured to run on all paths except for static files.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
