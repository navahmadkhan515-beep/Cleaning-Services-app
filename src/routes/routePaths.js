export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  SERVICE_DETAILS: '/services/:serviceId',
  ABOUT: '/about',
  PRICING: '/pricing',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  BOOK: '/book',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '*',
}

// Helper to build a Service Details link with a real id
export const getServiceDetailsPath = (serviceId) =>
  ROUTES.SERVICE_DETAILS.replace(':serviceId', serviceId)
