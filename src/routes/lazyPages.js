import { lazy } from 'react'

// Public pages
export const Home = lazy(() => import('../pages/Home'))
export const Services = lazy(() => import('../pages/Services'))
export const ServiceDetails = lazy(() => import('../pages/ServiceDetails'))
export const About = lazy(() => import('../pages/About'))
export const Pricing = lazy(() => import('../pages/Pricing'))
export const Contact = lazy(() => import('../pages/Contact'))
export const Login = lazy(() => import('../pages/Login'))
export const Register = lazy(() => import('../pages/Register'))
export const Book = lazy(() => import('../pages/Book'))
export const NotFound = lazy(() => import('../pages/NotFound'))

// Protected pages
export const Dashboard = lazy(() => import('../pages/Dashboard'))
