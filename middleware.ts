import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID_LANGS = new Set(['en', 'lt', 'lv', 'ro', 'cz', 'dk', 'gr', 'hu', 'hr', 'il', 'jp', 'ru', 'sk', 'tw'])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Bare /quiz/... → /${lang}/quiz/...  (fallback for bookmarks / direct links)
  if (pathname.startsWith('/quiz/')) {
    const langCookie = request.cookies.get('lang')?.value ?? 'en'
    const lang = VALID_LANGS.has(langCookie) ? langCookie : 'en'
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/quiz/:path*'],
}
