import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentUser } from './app/auth/session';

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  const { pathname } = request.nextUrl;

  const unprotectedRoutes = ['/login', '/signup'];

  if (!user && !unprotectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (user && unprotectedRoutes.includes(pathname)) {
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
};
