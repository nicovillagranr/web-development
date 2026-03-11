// ================= CONTEXTO MODULO =================
// Boton CTA reutilizable con neon glow Miami Vice.
export default function Button({ children, href, variant = 'primary', size = 'md', className = '', onClick }) {
  const base = 'inline-flex items-center justify-center font-heading font-600 tracking-wide rounded-full transition-all duration-300 cursor-pointer relative overflow-hidden'

  const sizes = {
    md: 'px-7 py-3 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-warm to-brand-sunset text-white shadow-[0_0_30px_rgba(255,45,149,0.3)] hover:shadow-[0_0_50px_rgba(255,45,149,0.5)] hover:scale-[1.03] active:scale-[0.98]',
    outline:
      'border border-brand-accent/40 text-brand-accent hover:bg-brand-accent/10 hover:border-brand-accent/70 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] hover:scale-[1.03] active:scale-[0.98]',
  }

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
