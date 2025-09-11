import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = publicPaths.includes(path)

  const sessionCookie = request.cookies.get('session')
  let isLoggedIn = false;
  
  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(sessionCookie.value);
      if (sessionData.isLoggedIn) {
        isLoggedIn = true;
      }
    } catch (error) {
        // Invalid or malformed cookie, treat as not logged in
        isLoggedIn = false;
    }
  }

  if (isLoggedIn && isPublicPath) {
    // If the user is logged in and tries to access a public page, redirect to home
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isLoggedIn && !isPublicPath) {
    // If the user is not logged in and tries to access a protected page, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Add x-pathname header for use in server components if needed
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Match all routes except for static assets and special next files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
