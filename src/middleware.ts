
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './app/auth/session';

export function middleware(request: NextRequest) {
  const session = getSession();
  const { pathname } = request.nextUrl;

  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If user is logged in and tries to access login/signup, redirect to home
  if (session.isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is NOT logged in and tries to access a protected route, redirect to login
  if (!session.isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // The matcher is configured to run on all paths except for static files.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
