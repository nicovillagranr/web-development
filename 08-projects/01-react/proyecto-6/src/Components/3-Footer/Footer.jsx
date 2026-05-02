import { Link } from "react-router-dom"
import { instagramIcon, facebookIcon } from "../../assets/icons"
import { ROUTES } from "../../utils/constants"

export const Footer = () => {
    return (
        <footer className="bg-paper text-ink font-body border-t border-stone-200">

            {/* ─── Brand + links + social ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">

                <div className="flex flex-col gap-5">
                    <span className="font-heading font-normal text-3xl text-ink">Fashion Go!</span>
                    <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em]">
                        <Link to={ROUTES.HELP} className="text-ink hover:text-camel transition-colors duration-200">Ayuda</Link>
                        <Link to={ROUTES.SHIPPING} className="text-ink hover:text-camel transition-colors duration-200">Envíos</Link>
                        <Link to={ROUTES.CONTACT} className="text-ink hover:text-camel transition-colors duration-200">Contacto</Link>
                        <Link to={ROUTES.TERMS} className="text-ink hover:text-camel transition-colors duration-200">Términos</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center border border-ink rounded-none hover:bg-ink transition-colors duration-200 group">
                        <img src={instagramIcon} alt="Instagram" className="w-4 h-4 group-hover:invert transition-[filter] duration-200" />
                    </a>
                    <a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center border border-ink rounded-none hover:bg-ink transition-colors duration-200 group">
                        <img src={facebookIcon} alt="Facebook" className="w-4 h-4 group-hover:invert transition-[filter] duration-200" />
                    </a>
                </div>

            </div>

            {/* ─── Medios de pago ─── */}
            <div className="border-t border-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1.5 border border-stone-300 text-stone-600 text-[10px] tracking-[0.18em] font-medium rounded-none">VISA</span>
                    <span className="px-3 py-1.5 border border-stone-300 text-stone-600 text-[10px] tracking-[0.18em] font-medium rounded-none">MASTERCARD</span>
                    <span className="px-3 py-1.5 border border-stone-300 text-stone-600 text-[10px] tracking-[0.18em] font-medium rounded-none">AMEX</span>
                    <span className="px-3 py-1.5 border border-stone-300 text-stone-600 text-[10px] tracking-[0.18em] font-medium rounded-none">WEBPAY</span>
                    <span className="px-3 py-1.5 border border-stone-300 text-stone-600 text-[10px] tracking-[0.18em] font-medium rounded-none">MACH</span>
                </div>
            </div>

            {/* ─── Copyright ─── */}
            <div className="border-t border-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 text-center text-[11px] uppercase tracking-[0.22em] text-stone-600">
                    <p>&copy; 2026 Fashion Go! · Todos los derechos reservados</p>
                </div>
            </div>

        </footer>
    )
}
