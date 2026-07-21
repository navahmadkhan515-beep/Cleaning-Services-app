import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/5 bg-primary-dark text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="font-display text-lg font-semibold text-white">
              Sparkle &amp; Co.
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Professional residential and commercial cleaning, booked in minutes
            and backed by a spotless-guarantee.
          </p>
          <div className="mt-5 flex gap-3">
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent hover:text-ink"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/services" className="hover:text-accent">Services</Link></li>
            <li><Link to="/pricing" className="hover:text-accent">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Get in touch
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <HiOutlineLocationMarker className="mt-0.5 shrink-0" size={16} />
              123 Meadow Lane, Springfield
            </li>
            <li className="flex items-center gap-2">
              <HiOutlinePhone size={16} />
              (555) 010-2938
            </li>
            <li className="flex items-center gap-2">
              <HiOutlineMail size={16} />
              hello@sparkleandco.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/50 sm:px-8">
        © {year} Sparkle &amp; Co. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
