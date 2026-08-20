// ================= CONTEXTO MODULO =================
// Footer con acentos neon Miami Vice.
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6'
import { FOOTER } from '../../data/content'
import { useScrollTo } from '../../hooks/useScrollTo'

export default function Footer() {
  const scrollTo = useScrollTo()

  return (
    <footer className="bg-brand-900 border-t border-brand-accent/8 pt-16 pb-8 px-6 md:px-10">
      {/* Grid de 3 columnas: Brand | Links empresa | Contacto */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>

            <span className="font-heading text-2xl font-800 text-brand-accent drop-shadow-glow-accent">
              {FOOTER.logo}<span className="text-brand-warm drop-shadow-glow-warm">.</span>
            </span>
            <p className="text-brand-muted mt-4 font-300 leading-relaxed">{FOOTER.tagline}</p>
            {/* Iconos de redes sociales con glow neon en hover */}
            <div className="flex gap-5 mt-6">
              <a href="#" className="text-brand-muted hover:text-brand-accent hover:drop-shadow-glow-accent-sm transition-all duration-300 text-lg">
                <FaLinkedin />
              </a>
              <a href="#" className="text-brand-muted hover:text-brand-warm hover:drop-shadow-glow-warm-sm transition-all duration-300 text-lg">
                <FaXTwitter />
              </a>
              <a href="#" className="text-brand-muted hover:text-brand-accent hover:drop-shadow-glow-accent-sm transition-all duration-300 text-lg">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Empresa links */}
          <div>
            <h4 className="font-heading font-700 text-brand-text text-sm uppercase tracking-widest mb-5">{FOOTER.columns[0].title}</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER.columns[0].links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-brand-muted hover:text-brand-accent transition-colors duration-300 cursor-pointer font-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-heading font-700 text-brand-text text-sm uppercase tracking-widest mb-5">{FOOTER.columns[1].title}</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER.columns[1].items.map((item) => (
                <li key={item} className="text-brand-muted font-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra de copyright — separada del grid por un borde sutil */}
        <div className="border-t border-brand-warm/8 pt-8 text-center text-brand-muted/50 text-sm font-300">
          {FOOTER.copyright}
        </div>
      </div>
    </footer>
  )
}
