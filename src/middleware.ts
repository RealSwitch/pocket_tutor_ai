import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './app/auth/session';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl

  // If the user is logged in and tries to access login or signup, redirect to home
  if (session.isLoggedIn && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // The matcher is configured to run on all paths except for static files.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
