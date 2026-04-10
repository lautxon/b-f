import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { EnvelopeSimple, Lock } from '@phosphor-icons/react'

function AdminLogin() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const { error } = await signIn(email, password)

    setSubmitting(false)

    if (error) {
      setError(error.message === 'Invalid login credentials'
        ? 'Email o password incorrectos'
        : error.message)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-ink mb-2">
            Barro & Fuego
          </h1>
          <p className="text-sm text-muted">
            Panel de administracion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border border-border rounded-crisp p-8 bg-card">
          <h2 className="font-serif text-xl text-ink mb-6">
            Iniciar sesion
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded bg-ceramic-red/20 border border-ceramic-red/30 text-sm text-terracotta-light">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                Email
              </label>
              <div className="relative">
                <EnvelopeSimple size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta transition-colors"
                  placeholder="admin@barroyfuego.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={submitting}
            >
              {submitting ? 'Ingresando...' : 'Entrar'}
            </button>
          </div>
        </form>

        <p className="text-xs text-muted text-center mt-6">
          Acceso exclusivo para el administrador del sitio.
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
