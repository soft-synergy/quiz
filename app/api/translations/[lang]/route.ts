import { NextResponse } from 'next/server'
import type { LangCode } from '@/lib/lang-store'
import { VALID_LANGS, getRuntimeTranslations } from '@/lib/admin/translation-source'

export async function GET(_: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  if (!VALID_LANGS.includes(lang as LangCode)) {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 })
  }

  return NextResponse.json(getRuntimeTranslations(lang as LangCode), {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
