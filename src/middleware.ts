import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = publicPaths.some(p => path.startsWith(p));

  const sessionCookie = request.cookies.get('session');
  let isLoggedIn = false;
  
  try {
    const sessionData = JSON.parse(sessionCookie?.value || '{}');
    if (sessionData.isLoggedIn) {
      isLoggedIn = true;
    }
  } catch (error) {
    isLoggedIn = false;
  }

  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next();
}

export const config = {
  // The matcher is configured to run on all paths except for static files.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
