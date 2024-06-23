import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value;
  const pathname = request.nextUrl.pathname;

  if (
    currentUser &&
    (pathname.startsWith('/login') ||
      pathname.startsWith('/register') ||
      pathname.startsWith('/forget-password'))
  ) {
    return Response.redirect(new URL('/', request.url));
  }
}
