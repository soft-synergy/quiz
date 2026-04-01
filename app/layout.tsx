import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import StoreHydration from '@/components/StoreHydration/StoreHydration'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tai Chi Indoor Walking — 28-Day Challenge',
  description: 'Your personalized 28-day Tai Chi Indoor Walking challenge',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        {/* Read lang from localStorage BEFORE React renders — eliminates EN flash on refresh */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var _s = JSON.parse(localStorage.getItem('taichi-lang') || '{}');
            if (_s.state && _s.state.lang) window.__TAICHI_LANG__ = _s.state.lang;
          } catch(e) {}
        `}} />
        {/* Preload above-the-fold images */}
        <link rel="preload" as="image" href="/images/person-intro.png" />
        <link rel="preload" as="image" href="/images/Quiz - 2026-03-18T165703.172.png" />
      </head>
      <body>
        <StoreHydration />
        {children}
      </body>
    </html>
  )
}
