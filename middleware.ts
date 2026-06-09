import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const logado = request.cookies.get("maracana_login")?.value;
  const url = request.nextUrl.clone();

  const paginaLogin = url.pathname === "/login";

  if (!logado && !paginaLogin) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (logado && paginaLogin) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo-maracana.png).*)",
  ],
};