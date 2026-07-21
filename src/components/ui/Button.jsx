import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm shadow-primary/20',
  accent: 'bg-accent text-ink hover:bg-accent-dark',
  outline: 'border border-ink/15 text-ink hover:border-primary hover:text-primary',
  ghost: 'text-muted hover:text-ink',
}

const Button = ({ to, href, children, variant = 'primary', className = '', ...props }) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
