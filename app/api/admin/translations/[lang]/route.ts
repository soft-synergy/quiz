import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import type { LangCode } from '@/lib/lang-store'
import {
  VALID_LANGS,
  serializeAll,
  getAllSerializedTranslations,
  getRuntimeTranslations,
  writeRuntimeTranslations,
  writeTranslationSources,
} from '@/lib/admin/translation-source'

const DATA_DIR = path.join(process.cwd(), 'translations-data')

function isAuthed(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin'
  const authHeader = req.headers.get('x-admin-token')
  if (authHeader === adminPassword) return true
  const token = req.cookies.get('admin_token')?.value
  return token === adminPassword
}

export interface HistoryEntry {
  filename: string
  timestamp: string
  author: string
  changeCount: number
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ lang: string }> }) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lang } = await params
  if (!VALID_LANGS.includes(lang as LangCode)) {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 })
  }

  const langCode = lang as LangCode
  const enTranslations = serializeAll('en')
  const currentTranslations = langCode === 'en' ? enTranslations : getRuntimeTranslations(langCode)

  const historyDir = path.join(DATA_DIR, 'history', langCode)
  const history: HistoryEntry[] = []
  if (fs.existsSync(historyDir)) {
    const files = fs.readdirSync(historyDir).filter((f) => f.endsWith('.json')).sort().reverse()
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(historyDir, file), 'utf-8'))
        history.push({
          filename: file.replace('.json', ''),
          timestamp: data.timestamp ?? file.replace('.json', ''),
          author: data.author ?? 'Unknown',
          changeCount: Array.isArray(data.changes) ? data.changes.length : 0,
        })
      } catch {
        // skip malformed entries
      }
    }
  }

  return NextResponse.json({
    en: enTranslations,
    current: currentTranslations,
    overrides: null,
    history,
  })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ lang: string }> }) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lang } = await params
  if (!VALID_LANGS.includes(lang as LangCode)) {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 })
  }

  const body = await req.json().catch(() => ({}))
  const { overrides, author, changes } = body as {
    overrides: Record<string, string>
    author: string
    changes: Array<{ key: string; oldValue: string; newValue: string }>
  }

  if (!overrides || typeof overrides !== 'object') {
    return NextResponse.json({ error: 'Missing translation payload' }, { status: 400 })
  }

  const langCode = lang as LangCode
  const timestamp = new Date().toISOString()
  const expected = serializeAll(langCode)
  const missingKeys = Object.keys(expected).filter((key) => !(key in overrides))
  if (missingKeys.length > 0) {
    return NextResponse.json(
      {
        error: `Incomplete translation payload: missing ${missingKeys.length} keys`,
        missingKeys: missingKeys.slice(0, 20),
      },
      { status: 400 }
    )
  }

  try {
    const flatByLang = getAllSerializedTranslations()
    flatByLang[langCode] = overrides
    writeTranslationSources(flatByLang)
    writeRuntimeTranslations(langCode, overrides)

    const historyDir = path.join(DATA_DIR, 'history', langCode)
    fs.mkdirSync(historyDir, { recursive: true })
    const safeTimestamp = timestamp.replace(/[:.]/g, '-')
    fs.writeFileSync(
      path.join(historyDir, `${safeTimestamp}.json`),
      JSON.stringify({ timestamp, author, changes, overrides }, null, 2),
      'utf-8'
    )

    return NextResponse.json({ success: true, timestamp })
  } catch (error) {
    console.error('Failed to save admin translations', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to save translations',
        cwd: process.cwd(),
      },
      { status: 500 }
    )
  }
}
