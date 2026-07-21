import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-primary' : 'text-muted hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-ink/5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Sparkle&nbsp;<span className="text-primary">&amp; Co.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/login" className="text-sm font-medium text-muted hover:text-ink">
            Login
          </Link>
          <Link
            to="/book"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-primary-dark"
          >
            Book Now
          </Link>
        </div>

        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-ink/5 bg-surface md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-base'
                    }`
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="my-2 h-px bg-ink/5" />
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-base"
              >
                Login
              </Link>
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
