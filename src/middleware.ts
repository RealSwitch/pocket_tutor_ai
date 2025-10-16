
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './app/auth/session';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const authenticatedRoutes = ['/', '/challenge', '/study', '/rewards', '/teacher'];

  // If user is logged in and tries to access login/signup, redirect to home
  if (session.isLoggedIn && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is NOT logged in and tries to access a protected route, redirect to login
  if (!session.isLoggedIn && authenticatedRoutes.some(route => pathname.startsWith(route) && pathname !== '/login' && pathname !== '/signup')) {
     // Allow access to the root of the authenticated routes only if it is the root page
    if (pathname === '/') {
        if (!session.isLoggedIn) {
             return NextResponse.redirect(new URL('/login', request.url));
        }
       return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // The matcher is configured to run on all paths except for static files.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
