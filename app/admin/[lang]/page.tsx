'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface HistoryEntry {
  filename: string
  timestamp: string
  author: string
  changeCount: number
}

interface ChangeEntry {
  key: string
  oldValue: string
  newValue: string
}

interface TranslationData {
  en: Record<string, string>
  current: Record<string, string>
  overrides: Record<string, string> | null
  history: HistoryEntry[]
}

interface HistorySnapshot {
  timestamp: string
  author: string
  changes: ChangeEntry[]
  overrides: Record<string, string>
}

function getBasePreviewPath(lang: string) {
  return lang === 'en' ? '/quiz' : `/${lang}/quiz`
}

function getPreviewUrl(section: Section, lang: string, selectedStep: number | null) {
  const base = getBasePreviewPath(lang)
  switch (section) {
    case 'Intro':
      return lang === 'en' ? '/' : `/${lang}`
    case 'Quiz Steps':
      return `${base}/${selectedStep ?? 1}`
    case 'Step Page':
      return `${base}/${selectedStep ?? 23}`
    case 'Loading':
      return `${base}/loading-screen`
    case 'Wellness':
      return `${base}/wellness`
    case 'Result':
      return `${base}/result`
    case 'Email':
      return `${base}/email`
    case '28-Day':
      return `${base}/results-28`
    case 'Paywall':
      return `${base}/paywall`
    case 'UI':
      return `${base}/1`
    default:
      return lang === 'en' ? '/' : `/${lang}`
  }
}

type Section =
  | 'Intro'
  | 'UI'
  | 'Step Page'
  | 'Result'
  | '28-Day'
  | 'Wellness'
  | 'Loading'
  | 'Email'
  | 'Quiz Steps'
  | 'Paywall'

const SECTION_PREFIXES: Record<Section, string> = {
  Intro: 'intro.',
  UI: 'ui.',
  'Step Page': 'stepPage.',
  Result: 'result.',
  '28-Day': 'results28.',
  Wellness: 'wellness.',
  Loading: 'loading.',
  Email: 'email.',
  'Quiz Steps': 'steps.',
  Paywall: 'paywall.',
}

// Order matches the actual quiz flow:
// Intro → Quiz Steps → Loading Screen → Wellness → Result → plan-loading → Email → 28-Day → Paywall
const ALL_SECTIONS: Section[] = [
  'Intro',        // landing page
  'Quiz Steps',   // questions 1-N
  'Step Page',    // BMI, consent, goal weight inputs (inside quiz steps)
  'Loading',      // loading screen + review carousel
  'Wellness',     // wellness profile page
  'Result',       // BMI result → continue to plan-loading
  'Email',        // email capture
  '28-Day',       // 28-day results → paywall
  'Paywall',      // paywall + story cards
  'UI',           // shared UI labels (back, continue, skip…)
]

function filterBySection(data: Record<string, string>, section: Section): Record<string, string> {
  const prefix = SECTION_PREFIXES[section]
  const result: Record<string, string> = {}
  for (const [k, v] of Object.entries(data)) {
    if (k.startsWith(prefix)) {
      result[k] = v
    }
  }
  return result
}

function getStepNumbers(data: Record<string, string>): number[] {
  const nums = new Set<number>()
  for (const key of Object.keys(data)) {
    if (key.startsWith('steps.')) {
      const parts = key.split('.')
      if (parts[1]) nums.add(Number(parts[1]))
    }
  }
  return Array.from(nums).sort((a, b) => a - b)
}

function AutoTextarea({
  value,
  onChange,
  isModified,
  disabled,
}: {
  value: string
  onChange: (v: string) => void
  isModified: boolean
  disabled?: boolean
}) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value])

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      rows={1}
      style={{
        width: '100%',
        padding: '8px 10px',
        border: isModified ? '2px solid #f59e0b' : '1.5px solid #e2e8f0',
        borderRadius: 6,
        fontSize: 13,
        lineHeight: 1.5,
        fontFamily: 'inherit',
        background: disabled ? '#f8fafc' : isModified ? '#fffbeb' : '#fff',
        color: '#1e293b',
        resize: 'none',
        overflow: 'hidden',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.15s, background 0.15s',
      }}
      onFocus={(e) => {
        if (!disabled) e.target.style.borderColor = isModified ? '#f59e0b' : '#6366f1'
      }}
      onBlur={(e) => {
        e.target.style.borderColor = isModified ? '#f59e0b' : '#e2e8f0'
      }}
    />
  )
}

function KeyBadge({ keyName }: { keyName: string }) {
  const parts = keyName.split('.')
  const shortKey = parts.slice(2).join('.') || parts[parts.length - 1]
  return (
    <span
      style={{
        fontFamily: 'monospace',
        fontSize: 11,
        color: '#64748b',
        background: '#f1f5f9',
        padding: '2px 6px',
        borderRadius: 4,
        display: 'inline-block',
        wordBreak: 'break-all',
      }}
    >
      {shortKey}
    </span>
  )
}

function TranslationRow({
  keyName,
  enValue,
  currentValue,
  editValue,
  isModified,
  onChange,
  isSource,
}: {
  keyName: string
  enValue: string
  currentValue: string
  editValue: string
  isModified: boolean
  onChange: (v: string) => void
  isSource: boolean
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '180px 1fr 1fr',
        gap: 8,
        padding: '10px 12px',
        borderBottom: '1px solid #f1f5f9',
        alignItems: 'start',
      }}
    >
      <div style={{ paddingTop: 8 }}>
        <KeyBadge keyName={keyName} />
      </div>
      <div
        style={{
          padding: '8px 10px',
          background: '#f8fafc',
          borderRadius: 6,
          fontSize: 13,
          color: '#475569',
          lineHeight: 1.5,
          whiteSpace: 'pre-wrap',
          border: '1.5px solid #e2e8f0',
          minHeight: 36,
        }}
      >
        {enValue}
      </div>
      <AutoTextarea
        value={editValue}
        onChange={onChange}
        isModified={isModified}
        disabled={isSource}
      />
    </div>
  )
}

function HistoryPanel({
  history,
  lang,
  onClose,
  onRestore,
}: {
  history: HistoryEntry[]
  lang: string
  onClose: () => void
  onRestore: (snapshot: HistorySnapshot) => void | Promise<void>
}) {
  const [selected, setSelected] = useState<HistorySnapshot | null>(null)
  const [loadingEntry, setLoadingEntry] = useState<string | null>(null)

  async function loadSnapshot(entry: HistoryEntry) {
    setLoadingEntry(entry.filename)
    try {
      const res = await fetch(`/api/admin/history/${lang}/${entry.filename}`)
      const data = await res.json()
      setSelected(data)
    } finally {
      setLoadingEntry(null)
    }
  }

  function formatDate(ts: string) {
    try {
      return new Date(ts).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return ts
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: 480,
        background: '#fff',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#f8fafc',
        }}
      >
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0f172a' }}>
          Save History
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 20,
            color: '#64748b',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {history.length === 0 ? (
        <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
          No saves yet for this language.
        </div>
      ) : (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* History list */}
          <div
            style={{
              width: 220,
              borderRight: '1px solid #e2e8f0',
              overflowY: 'auto',
              flexShrink: 0,
            }}
          >
            {history.map((entry) => (
              <div
                key={entry.filename}
                onClick={() => loadSnapshot(entry)}
                style={{
                  padding: '12px 14px',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  background:
                    selected?.timestamp === entry.timestamp ? '#f0f4ff' : '#fff',
                  borderLeft:
                    selected?.timestamp === entry.timestamp
                      ? '3px solid #6366f1'
                      : '3px solid transparent',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>
                  {formatDate(entry.timestamp)}
                </div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                  {entry.author || 'Unknown'}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#6366f1',
                    marginTop: 4,
                    fontWeight: 500,
                  }}
                >
                  {entry.changeCount} change{entry.changeCount !== 1 ? 's' : ''}
                </div>
                {loadingEntry === entry.filename && (
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Loading...</div>
                )}
              </div>
            ))}
          </div>

          {/* Snapshot diff */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {!selected ? (
              <div style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', marginTop: 40 }}>
                Select a save to see changes
              </div>
            ) : (
              <>
                <div
                  style={{
                    marginBottom: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                      {formatDate(selected.timestamp)}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>by {selected.author}</div>
                  </div>
                  <button
                    onClick={() => onRestore(selected)}
                    style={{
                      background: '#6366f1',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Restore
                  </button>
                </div>

                {!selected.changes || selected.changes.length === 0 ? (
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>No changes recorded.</div>
                ) : (
                  selected.changes.map((change) => (
                    <div
                      key={change.key}
                      style={{
                        marginBottom: 12,
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          padding: '6px 10px',
                          background: '#f8fafc',
                          borderBottom: '1px solid #e2e8f0',
                          fontSize: 11,
                          fontFamily: 'monospace',
                          color: '#64748b',
                        }}
                      >
                        {change.key}
                      </div>
                      {change.oldValue && (
                        <div
                          style={{
                            padding: '6px 10px',
                            background: '#fef2f2',
                            fontSize: 12,
                            color: '#991b1b',
                            whiteSpace: 'pre-wrap',
                            borderBottom: '1px solid #fee2e2',
                          }}
                        >
                          − {change.oldValue}
                        </div>
                      )}
                      <div
                        style={{
                          padding: '6px 10px',
                          background: '#f0fdf4',
                          fontSize: 12,
                          color: '#166534',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        + {change.newValue}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function TranslationEditorPage() {
  const params = useParams()
  const router = useRouter()
  const lang = params.lang as string

  const [data, setData] = useState<TranslationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [edits, setEdits] = useState<Record<string, string>>({})
  const [section, setSection] = useState<Section>('Intro')
  const [showHistory, setShowHistory] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [author, setAuthor] = useState('')
  const [showAuthorModal, setShowAuthorModal] = useState(false)
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewRefresh, setPreviewRefresh] = useState(0)
  const previewFrameRef = useRef<HTMLIFrameElement>(null)
  const previewScrollRef = useRef<{ x: number; y: number } | null>(null)

  const LANGUAGES_META: Record<string, { label: string; flag: string }> = {
    en: { label: 'English', flag: '🇬🇧' },
    lt: { label: 'Lietuvių', flag: '🇱🇹' },
    lv: { label: 'Latviešu', flag: '🇱🇻' },
    ro: { label: 'Română', flag: '🇷🇴' },
    cz: { label: 'Čeština', flag: '🇨🇿' },
    dk: { label: 'Dansk', flag: '🇩🇰' },
    gr: { label: 'Ελληνικά', flag: '🇬🇷' },
    hu: { label: 'Magyar', flag: '🇭🇺' },
    hr: { label: 'Hrvatski', flag: '🇭🇷' },
    il: { label: 'עברית', flag: '🇮🇱' },
    jp: { label: '日本語', flag: '🇯🇵' },
    ru: { label: 'Русский', flag: '🇷🇺' },
    sk: { label: 'Slovenčina', flag: '🇸🇰' },
    tw: { label: '繁體中文', flag: '🇹🇼' },
  }

  const isSource = lang === 'en'
  const langMeta = LANGUAGES_META[lang] ?? { label: lang, flag: '' }

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/translations/${lang}`)
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? 'Failed to load translations')
        return
      }
      const d: TranslationData = await res.json()
      setData(d)
      // Initialize edits from overrides or current
      const base = d.overrides ?? d.current
      setEdits({ ...base })
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [lang, router])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        if (!saving && !isSource) {
          void handleSave()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [saving, isSource, author, data, edits])

  // Count unsaved changes
  const unsavedCount = data
    ? Object.keys(edits).filter((k) => {
        const base = data.overrides ?? data.current
        return edits[k] !== (base[k] ?? data.current[k])
      }).length
    : 0

  function handleEdit(key: string, value: string) {
    setEdits((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    if (!data) return
    if (!author.trim()) {
      setShowAuthorModal(true)
      return
    }
    await doSave()
  }

  async function waitForPreviewReady(url: string, expectedValues: string[]) {
    const snippets = expectedValues
      .map((value) => value.trim())
      .filter((value) => value.length >= 2)
      .slice(0, 3)

    if (snippets.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return
    }

    for (let attempt = 0; attempt < 12; attempt++) {
      try {
        const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}adminPreviewProbe=${Date.now()}`, {
          cache: 'no-store',
          credentials: 'same-origin',
        })
        if (res.ok) {
          const html = await res.text()
          if (snippets.every((snippet) => html.includes(snippet))) {
            return
          }
        }
      } catch {
        // ignore transient rebuild/hydration timing issues and retry
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  function capturePreviewScroll() {
    try {
      const win = previewFrameRef.current?.contentWindow
      if (!win) return
      previewScrollRef.current = {
        x: win.scrollX,
        y: win.scrollY,
      }
    } catch {
      previewScrollRef.current = null
    }
  }

  function refreshPreviewPreservingScroll() {
    capturePreviewScroll()
    setPreviewRefresh((v) => v + 1)
  }

  function handlePreviewLoad() {
    const pos = previewScrollRef.current
    if (!pos) return

    try {
      previewFrameRef.current?.contentWindow?.scrollTo(pos.x, pos.y)
    } catch {
      // ignore scroll restore issues for preview
    }
  }

  async function doSave(authorName?: string, payload?: Record<string, string>) {
    if (!data) return
    const name = authorName ?? author
    const nextEdits = payload ?? edits
    setSaving(true)

    const base = data.overrides ?? data.current
    const changes: ChangeEntry[] = []

    for (const [key, newValue] of Object.entries(nextEdits)) {
      const oldValue = base[key] ?? data.current[key] ?? ''
      if (newValue !== oldValue) {
        changes.push({ key, oldValue, newValue })
      }
    }

    try {
      const res = await fetch(`/api/admin/translations/${lang}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overrides: nextEdits, author: name, changes }),
      })
      if (res.ok) {
        const saved = (await res.json()) as { timestamp?: string }
        const savedTimestamp = saved.timestamp ?? new Date().toISOString()
        const savedFilename = savedTimestamp.replace(/[:.]/g, '-')
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
        setShowPreview(true)
        refreshPreviewPreservingScroll()
        void waitForPreviewReady(
          getPreviewUrl(section, lang, selectedStep),
          changes.map((change) => change.newValue)
        ).then(() => {
          refreshPreviewPreservingScroll()
        })
        setData((prev) =>
          prev
            ? {
                ...prev,
                current: { ...nextEdits },
                overrides: null,
                history: [
                  {
                    filename: savedFilename,
                    timestamp: savedTimestamp,
                    author: name || 'Unknown',
                    changeCount: changes.length,
                  },
                  ...prev.history,
                ],
              }
            : prev
        )
        setEdits({ ...nextEdits })
      } else {
        const d = await res.json()
        alert(d.error ?? 'Save failed')
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleRestore(snapshot: HistorySnapshot) {
    setEdits({ ...snapshot.overrides })
    setShowHistory(false)
    await doSave(author || `Restore: ${snapshot.author || 'history'}`, snapshot.overrides)
  }

  // Get keys for current section
  const sectionKeys = data ? filterBySection(data.en, section) : {}
  const stepNumbers = data ? getStepNumbers(data.en) : []

  const currentStepKeys =
    section === 'Quiz Steps' && selectedStep !== null && data
      ? Object.fromEntries(
          Object.entries(data.en).filter((([k]) => k.startsWith(`steps.${selectedStep}.`)))
        )
      : null

  const previewUrl = getPreviewUrl(section, lang, selectedStep)
  const previewUrlWithRefresh = `${previewUrl}${previewUrl.includes('?') ? '&' : '?'}preview=${previewRefresh}`

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
        }}
      >
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>⏳</div>
          <div style={{ fontSize: 16, fontWeight: 500 }}>Loading translations...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>❌</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#dc2626', marginBottom: 16 }}>
            {error}
          </div>
          <button
            onClick={loadData}
            style={{
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              href="/admin"
              style={{
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              ← Back
            </Link>
            <span style={{ color: '#475569' }}>|</span>
            <span style={{ fontSize: 22 }}>{langMeta.flag}</span>
            <h1 style={{ margin: 0, color: '#fff', fontSize: 17, fontWeight: 600 }}>
              {langMeta.label}
            </h1>
            {isSource && (
              <span
                style={{
                  background: '#e0e7ff',
                  color: '#4338ca',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 20,
                  textTransform: 'uppercase',
                }}
              >
                Source · Read only
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {unsavedCount > 0 && (
              <span
                style={{
                  background: '#fef3c7',
                  color: '#92400e',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 20,
                }}
              >
                {unsavedCount} unsaved
              </span>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 12,
                  width: 120,
                  outline: 'none',
                }}
              />
              {!isSource && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                  <button
                    onClick={handleSave}
                    disabled={saving || unsavedCount === 0}
                    style={{
                      background:
                        saveSuccess
                          ? '#22c55e'
                          : saving || unsavedCount === 0
                          ? 'rgba(255,255,255,0.15)'
                          : '#6366f1',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 16px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: saving || unsavedCount === 0 ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                      minWidth: 80,
                    }}
                  >
                    {saveSuccess ? 'Saved!' : saving ? 'Saving...' : 'Save'}
                  </button>
                  <div style={{ fontSize: 11, color: '#cbd5e1', lineHeight: 1 }}>
                    Save shortcut: {typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC') ? 'Cmd+S' : 'Ctrl+S'}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowPreview(true)}
              style={{
                background: showPreview ? '#6366f1' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 13,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Open Right Preview
            </button>
            <Link
              href={previewUrl}
              target="_blank"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 13,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontWeight: 600,
              }}
            >
              Open In New Tab ↗
            </Link>
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                background: showHistory ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              History {data.history.length > 0 && `(${data.history.length})`}
            </button>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 24px',
          position: 'sticky',
          top: 64,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
          }}
        >
          {ALL_SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSection(s)
                setSelectedStep(null)
              }}
              style={{
                padding: '12px 16px',
                border: 'none',
                borderBottom: section === s ? '2px solid #6366f1' : '2px solid transparent',
                background: 'none',
                color: section === s ? '#6366f1' : '#64748b',
                fontWeight: section === s ? 600 : 400,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Placeholder note */}
      {section === 'Paywall' && (
        <div
          style={{
            background: '#eff6ff',
            borderBottom: '1px solid #dbeafe',
            padding: '8px 24px',
          }}
        >
          <div style={{ maxWidth: 1400, margin: '0 auto', fontSize: 12, color: '#1d4ed8' }}>
            Placeholders:{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>__NAME__</code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>__V__</code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>__TODAY__</code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>__RENEW__</code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>__YEARS__</code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>__BMI__</code>{' '}
            — keep these tokens in your translation, they will be replaced at runtime.
          </div>
        </div>
      )}
      {section === 'Loading' && (
        <div
          style={{
            background: '#eff6ff',
            borderBottom: '1px solid #dbeafe',
            padding: '8px 24px',
          }}
        >
          <div style={{ maxWidth: 1400, margin: '0 auto', fontSize: 12, color: '#1d4ed8' }}>
            This section includes the loading screen text and customer reviews (shown in the carousel during loading).
          </div>
        </div>
      )}
      {(section === 'Step Page' || section === 'Result' || section === '28-Day') && (
        <div
          style={{
            background: '#eff6ff',
            borderBottom: '1px solid #dbeafe',
            padding: '8px 24px',
          }}
        >
          <div style={{ maxWidth: 1400, margin: '0 auto', fontSize: 12, color: '#1d4ed8' }}>
            Placeholders:{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>
              __BMI__
            </code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>
              __MIN__
            </code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>
              __MAX__
            </code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>
              __UNIT__
            </code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>
              __N__
            </code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>
              __W__
            </code>{' '}
            <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3 }}>
              __D__
            </code>{' '}
            — keep these tokens in your translation, they will be replaced at runtime.
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          maxWidth: showPreview ? 1680 : 1400,
          margin: '0 auto',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: showPreview ? 'minmax(0, 1fr) 540px' : 'minmax(0, 1fr)',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <div>
        {section !== 'Quiz Steps' ? (
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr 1fr',
                gap: 8,
                padding: '10px 12px',
                background: '#f8fafc',
                borderBottom: '2px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Key
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                English (Source)
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isSource ? 'Value' : `${langMeta.label} Translation`}
              </div>
            </div>

            {Object.entries(sectionKeys).map(([key, enValue]) => {
              const currentValue = data.current[key] ?? ''
              const editValue = edits[key] ?? currentValue
              const base = data.overrides ?? data.current
              const isModified = editValue !== (base[key] ?? currentValue)

              return (
                <TranslationRow
                  key={key}
                  keyName={key}
                  enValue={enValue}
                  currentValue={currentValue}
                  editValue={editValue}
                  isModified={isModified}
                  onChange={(v) => handleEdit(key, v)}
                  isSource={isSource}
                />
              )
            })}

            {Object.keys(sectionKeys).length === 0 && (
              <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8' }}>
                No keys in this section.
              </div>
            )}
          </div>
        ) : (
          /* Quiz Steps Section */
          <div style={{ display: 'flex', gap: 20 }}>
            {/* Step list sidebar */}
            <div
              style={{
                width: 180,
                flexShrink: 0,
                background: '#fff',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                alignSelf: 'flex-start',
                position: 'sticky',
                top: 128,
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  background: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Steps
              </div>
              {stepNumbers.map((n) => {
                const stepKeys = Object.keys(data.en).filter((k) => k.startsWith(`steps.${n}.`))
                const modified = stepKeys.filter((k) => {
                  const base = data.overrides ?? data.current
                  const ev = edits[k] ?? data.current[k] ?? ''
                  return ev !== (base[k] ?? data.current[k] ?? '')
                }).length

                return (
                  <button
                    key={n}
                    onClick={() => setSelectedStep(n)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '9px 14px',
                      background: selectedStep === n ? '#f0f4ff' : '#fff',
                      borderLeft: selectedStep === n ? '3px solid #6366f1' : '3px solid transparent',
                      border: 'none',
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: 13,
                      color: selectedStep === n ? '#4338ca' : '#374151',
                      fontWeight: selectedStep === n ? 600 : 400,
                    }}
                  >
                    <span>Step {n}</span>
                    {modified > 0 && (
                      <span
                        style={{
                          background: '#fef3c7',
                          color: '#92400e',
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: 10,
                        }}
                      >
                        {modified}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Step editor */}
            <div style={{ flex: 1 }}>
              {selectedStep === null ? (
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    padding: 48,
                    textAlign: 'center',
                    color: '#94a3b8',
                  }}
                >
                  Select a step from the sidebar to edit it.
                </div>
              ) : currentStepKeys !== null ? (
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: '14px 16px',
                      background: '#f8fafc',
                      borderBottom: '2px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        background: '#6366f1',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 12,
                        padding: '3px 10px',
                        borderRadius: 20,
                      }}
                    >
                      Step {selectedStep}
                    </span>
                    <span style={{ fontSize: 12, color: '#64748b' }}>
                      {Object.keys(currentStepKeys).length} field
                      {Object.keys(currentStepKeys).length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '180px 1fr 1fr',
                      gap: 8,
                      padding: '8px 12px',
                      background: '#fafafa',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                      Field
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                      English
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                      {isSource ? 'Value' : `${langMeta.label}`}
                    </div>
                  </div>

                  {Object.entries(currentStepKeys).map(([key, enValue]) => {
                    const currentValue = data.current[key] ?? ''
                    const editValue = edits[key] ?? currentValue
                    const base = data.overrides ?? data.current
                    const isModified = editValue !== (base[key] ?? currentValue)

                    return (
                      <TranslationRow
                        key={key}
                        keyName={key}
                        enValue={enValue}
                        currentValue={currentValue}
                        editValue={editValue}
                        isModified={isModified}
                        onChange={(v) => handleEdit(key, v)}
                        isSource={isSource}
                      />
                    )
                  })}
                </div>
              ) : null}
            </div>
          </div>
        )}
        </div>

        {showPreview && (
          <div
            style={{
              position: 'sticky',
              top: 128,
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              minHeight: 720,
            }}
          >
            <div
              style={{
                padding: '12px 14px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                background: '#f8fafc',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Live Preview</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{previewUrl}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={refreshPreviewPreservingScroll}
                  style={{
                    background: '#fff',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    padding: '7px 10px',
                    fontSize: 12,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Refresh
                </button>
                <Link
                  href={previewUrl}
                  target="_blank"
                  style={{
                    background: '#6366f1',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '7px 10px',
                    fontSize: 12,
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Open ↗
                </Link>
                <button
                  onClick={() => setShowPreview(false)}
                  style={{
                    background: '#fff',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    padding: '7px 10px',
                    fontSize: 12,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Close
                </button>
              </div>
            </div>

            <iframe
              ref={previewFrameRef}
              key={previewUrlWithRefresh}
              title="Quiz preview"
              src={previewUrlWithRefresh}
              onLoad={handlePreviewLoad}
              style={{
                width: '100%',
                height: 'calc(100vh - 210px)',
                minHeight: 720,
                border: 0,
                background: '#fff',
              }}
            />
          </div>
        )}
      </div>

      {/* History Panel */}
      {showHistory && (
        <>
          <div
            onClick={() => setShowHistory(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              zIndex: 99,
            }}
          />
          <HistoryPanel
            history={data.history}
            lang={lang}
            onClose={() => setShowHistory(false)}
            onRestore={handleRestore}
          />
        </>
      )}

      {/* Author modal */}
      {showAuthorModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 32,
              width: 360,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 600 }}>
              Who is saving these changes?
            </h3>
            <p style={{ margin: '0 0 20px', color: '#64748b', fontSize: 13 }}>
              Enter your name to attribute this save in the history.
            </p>
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && author.trim()) {
                  setShowAuthorModal(false)
                  doSave(author)
                }
              }}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: 8,
                fontSize: 14,
                boxSizing: 'border-box',
                outline: 'none',
                marginBottom: 16,
              }}
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAuthorModal(false)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (author.trim()) {
                    setShowAuthorModal(false)
                    doSave(author)
                  }
                }}
                disabled={!author.trim()}
                style={{
                  padding: '8px 16px',
                  background: author.trim() ? '#6366f1' : '#94a3b8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: author.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
