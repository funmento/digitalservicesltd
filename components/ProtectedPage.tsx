import { getUser } from '@netlify/identity'
import { redirect } from 'next/navigation'

export async function ProtectedPage({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  if (!user) redirect('/login')
  return children
}
