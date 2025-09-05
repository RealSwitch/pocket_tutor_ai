import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Middleware logic can be added here if needed in the future.
  // For now, we are letting the client-side auth context handle route protection.
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
