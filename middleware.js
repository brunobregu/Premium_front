export function middleware(request) {
  const currentUser = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  if (
    currentUser &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return Response.redirect(new URL("/", request.url));
  }
}
