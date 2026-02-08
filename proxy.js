import { NextResponse } from 'next/server'

export function proxy(request) {
  const { pathname } = request.nextUrl
  
  // Get cookies from the request
  const accessToken = request.cookies.get('access_token')?.value
  const isAuthenticated = !!accessToken
  
  // Only handle root redirect to prevent loops
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
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

