import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from './routePaths'

// Replace this with real auth logic (context, redux, etc.)
const useAuth = () => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'))
  return { isAuthenticated }
}

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
