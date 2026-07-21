import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(() => window.innerWidth >= 768);

  // On mobile: close the menu, then hide the header bar after exit animation
  const closeMobileNav = () => {
    setOpen(false);
    if (window.innerWidth < 768) {
      setTimeout(() => setIsVisible(false), 250);
    }
  };

  // Toggle mobile menu – opens the bar if hidden, or closes everything
  const toggleMobileMenu = () => {
    if (!isVisible) {
      // Hidden → show bar first, then open menu after slide-in
      setIsVisible(true);
      setTimeout(() => setOpen(true), 200);
    } else if (open) {
      // Menu open → close menu, then hide bar after its exit animation
      setOpen(false);
      setTimeout(() => setIsVisible(false), 250);
    } else {
      // Bar visible but menu closed → just open
      setOpen(true);
    }
  };

  // Desktop is always visible; mobile starts hidden
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsVisible(true);
        setOpen(false);
      } else {
        setIsVisible(false);
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-primary" : "text-muted hover:text-ink"
    }`;

  return (
    <>
      {/* ── Floating hamburger button (visible only on mobile) ── */}
      <button
        className="fixed right-5 top-4 z-50 flex items-center justify-center rounded-full bg-primary p-2.5 text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark md:hidden"
        onClick={toggleMobileMenu}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <HiX size={22} /> : <HiMenu size={22} />}
      </button>

      {/* ── Header bar (hidden on mobile until triggered) ── */}
      <header
        className={`sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-ink/5 transition-transform duration-300 md:translate-y-0 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-0 sm:py-4 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              Sparkle&nbsp;<span className="text-primary">&amp; Co.</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/login"
              className="text-sm font-medium text-muted hover:text-ink"
            >
              Login
            </Link>
            <Link
              to="/book"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition hover:bg-primary-dark"
            >
              Book Now
            </Link>
          </div>

          {/* Hidden desktop hamburger (not used – mobile uses floating FAB) */}
          <button className="hidden" aria-hidden="true" />
        </nav>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {open && (
            <>
              <div
                onClick={closeMobileNav}
                className="fixed inset-0 z-10 bg-black/20 md:hidden"
                aria-hidden="true"
              />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-20 overflow-hidden border-t border-ink/5 bg-surface md:hidden"
              >
                <div className="flex flex-col gap-1 px-5 py-2">
                  {links.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={closeMobileNav}
                      className={({ isActive }) =>
                        `rounded-lg px-3 py-2.5 text-sm font-medium ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted hover:bg-base"
                        }`
                      }
                      end={link.to === "/"}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <div className="my-2 h-px bg-ink/5" />
                  <Link
                    to="/login"
                    onClick={closeMobileNav}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-base"
                  >
                    Login
                  </Link>
                  <Link
                    to="/book"
                    onClick={closeMobileNav}
                    className="mt-1 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
