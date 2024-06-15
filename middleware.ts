import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value;
  const pathname = request.nextUrl.pathname;

  if (
    currentUser &&
    (pathname.startsWith('/login') || pathname.startsWith('/register'))
  ) {
    return Response.redirect(new URL('/', request.url));
  }
}

// import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
// import withAuth from 'next-auth/middleware';

// export default withAuth({
//   pages: {
//     ...pagesOptions,
//   },
// });

// export const config = {
//   // restricted routes
//   matcher: [
//     '/',
//     '/executive',
//     '/financial',
//     '/analytics',
//     '/logistics/:path*',
//     '/ecommerce/:path*',
//     '/support/:path*',
//     '/file/:path*',
//     '/file-manager',
//     '/invoice/:path*',
//     '/forms/profile-settings/:path*',
//   ],
// };
