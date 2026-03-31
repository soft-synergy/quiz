import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { LANGUAGES } from '@/lib/i18n'

const DATA_DIR = path.join(process.cwd(), 'translations-data')

async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin'
  if (token !== adminPassword) {
    redirect('/admin/login')
  }
}

function getOverrideInfo(code: string): { exists: boolean; lastModified?: string } {
  const filePath = path.join(DATA_DIR, `${code}.json`)
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath)
    return {
      exists: true,
      lastModified: stat.mtime.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
  }
  return { exists: false }
}

async function LogoutButton() {
  return (
    <form
      action={async () => {
        'use server'
        const { cookies: getCookies } = await import('next/headers')
        const { redirect: redir } = await import('next/navigation')
        const cookieStore = await getCookies()
        cookieStore.set('admin_token', '', { httpOnly: true, path: '/', maxAge: 0 })
        redir('/admin/login')
      }}
    >
      <button
        type="submit"
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
        }}
      >
        Sign out
      </button>
    </form>
  )
}

export default async function AdminDashboard() {
  await requireAuth()

  const languages = LANGUAGES.map((lang) => ({
    ...lang,
    info: getOverrideInfo(lang.code),
    isSource: lang.code === 'en',
  }))

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '0 32px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              🌐
            </div>
            <div>
              <h1 style={{ margin: 0, color: '#fff', fontSize: 20, fontWeight: 700 }}>
                Translations Admin
              </h1>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: 12 }}>
                14 languages · Taichi Coach
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#0f172a' }}>
            Select a language to edit
          </h2>
          <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: 14 }}>
            Click any language card to open the translation editor. English is the source language and is read-only.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={`/admin/${lang.code}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '20px',
                  border: lang.isSource ? '2px solid #e0e7ff' : '2px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {lang.isSource && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#e0e7ff',
                      color: '#4338ca',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 20,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Source
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>{lang.flag}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 15 }}>
                      {lang.label}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }}>
                      {lang.code}
                    </div>
                  </div>
                </div>

                {lang.isSource ? (
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>Read-only source language</div>
                ) : lang.info.exists ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#22c55e',
                      }}
                    />
                    <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>
                      Overrides saved
                    </span>
                    <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 4 }}>
                      {lang.info.lastModified}
                    </span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#d1d5db',
                      }}
                    />
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>No custom overrides</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
