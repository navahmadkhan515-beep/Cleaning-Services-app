import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './routePaths'
import ProtectedRoute from './ProtectedRoute'
import Layout from '../components/layout/Layout'
import {
  Home,
  Services,
  ServiceDetails,
  About,
  Pricing,
  Contact,
  Login,
  Register,
  Book,
  Dashboard,
  NotFound,
} from './lazyPages'

const RouteFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted">
    Loading...
  </div>
)

const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SERVICES} element={<Services />} />
          <Route path={ROUTES.SERVICE_DETAILS} element={<ServiceDetails />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.PRICING} element={<Pricing />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.BOOK} element={<Book />} />

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>

          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
