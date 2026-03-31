import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'translations-data')

function isAuthed(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin'
  const authHeader = req.headers.get('x-admin-token')
  if (authHeader === adminPassword) return true
  const token = req.cookies.get('admin_token')?.value
  return token === adminPassword
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string; filename: string }> }
) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lang, filename } = await params

  const filePath = path.join(DATA_DIR, 'history', lang, `${filename}.json`)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to read snapshot' }, { status: 500 })
  }
}
