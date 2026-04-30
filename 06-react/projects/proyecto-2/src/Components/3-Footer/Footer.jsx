import { Link } from "react-router-dom"
import { instagramIcon, facebookIcon } from "../../assets/icons"

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 font-body">

            {/* ─── Brand + links + social ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div className="flex flex-col gap-3">
                    <span className="font-heading text-lg font-semibold text-white">Fashion Go!</span>
                    <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small">
                        <Link to="/ayuda" className="hover:text-rose-500 transition-colors duration-200">Ayuda</Link>
                        <span className="text-gray-600">·</span>
                        <Link to="/envios" className="hover:text-rose-500 transition-colors duration-200">Envíos</Link>
                        <span className="text-gray-600">·</span>
                        <Link to="/contacto" className="hover:text-rose-500 transition-colors duration-200">Contacto</Link>
                        <span className="text-gray-600">·</span>
                        <Link to="/terminos" className="hover:text-rose-500 transition-colors duration-200">Términos</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-rose-500 transition-colors duration-200">
                        <img src={instagramIcon} alt="Instagram" className="w-4 h-4" />
                    </a>
                    <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-rose-500 transition-colors duration-200">
                        <img src={facebookIcon} alt="Facebook" className="w-4 h-4" />
                    </a>
                </div>

            </div>

            {/* ─── Medios de pago ─── */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">VISA</span>
                    <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">MASTERCARD</span>
                    <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">AMEX</span>
                    <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">WEBPAY</span>
                    <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">MACH</span>
                </div>
            </div>

            {/* ─── Copyright ─── */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-small text-gray-500">
                    <p>&copy; 2026 Fashion Go! Todos los derechos reservados.</p>
                </div>
            </div>

        </footer>
    )
}
