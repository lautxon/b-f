import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="py-32 text-center">
        <p className="text-muted">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
