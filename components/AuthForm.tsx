'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { AuthError, login, signup } from '@netlify/identity'
import { ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react'

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(''); setMessage('')
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email')); const password = String(data.get('password'))
    try {
      if (mode === 'register') {
        const user = await signup(email, password, { full_name: String(data.get('name')) })
        if (!user.confirmedAt) { setMessage('Check your inbox to confirm your account, then sign in.'); return }
        router.push('/onboarding')
      } else { await login(email, password); window.location.href = '/dashboard' }
    } catch (caught) { setError(caught instanceof AuthError ? caught.message : 'Unable to complete this request. Please try again.') }
    finally { setLoading(false) }
  }

  return <form className="auth-form" onSubmit={submit}>{mode==='register'&&<label>Full name<input name="name" autoComplete="name" required /></label>}<label>Work email<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" minLength={8} autoComplete={mode==='login'?'current-password':'new-password'} required /></label>{mode==='register'&&<label className="check-label"><input type="checkbox" required/><span>I agree to the Terms of Service and Privacy Policy.</span></label>}{error&&<p className="auth-error">{error}</p>}{message&&<p className="auth-message"><CheckCircle2/>{message}</p>}<button className="button auth-button" disabled={loading}>{loading?'Please wait…':mode==='login'?'Sign in to workspace':'Create your account'}<ArrowRight/></button><div className="auth-security"><LockKeyhole/>Protected by secure, encrypted authentication</div><p className="auth-switch">{mode==='login'?<>New to Digital Services ERP? <Link href="/register">Start Free Trial</Link></>:<>Already have an account? <Link href="/login">Sign in</Link></>}</p></form>
}
