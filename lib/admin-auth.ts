import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Call this at the top of any protected admin page to enforce authentication.
export async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin'
  if (token !== adminPassword) {
    redirect('/admin/login')
  }
}
