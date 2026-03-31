import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { password } = body as { password?: string }

  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin'

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('admin_token', adminPassword, {
    httpOnly: true,
    path: '/',
    maxAge: 86400 * 30,
    sameSite: 'lax',
  })

  return NextResponse.json({ success: true })
}
