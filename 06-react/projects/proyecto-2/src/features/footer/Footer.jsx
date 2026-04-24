import { Link } from "react-router-dom"
import { instagramIcon, facebookIcon } from "../../assets/icons"

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 font-body">

            {/* ─── Top: Newsletter ─── */}
            <div className="border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">Suscríbete a nuestro newsletter</h3>
                        <p className="text-small text-gray-400 mt-1">Recibe ofertas exclusivas, lanzamientos y descuentos directo en tu correo.</p>
                    </div>
                    <form className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            className="flex-1 md:w-80 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-small text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white text-small font-semibold rounded-md transition-colors duration-200 cursor-pointer"
                        >
                            Suscribirme
                        </button>
                    </form>
                </div>
            </div>

            {/* ─── Middle: Columnas de links ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

                <div>
                    <h4 className="font-heading text-white text-small font-semibold uppercase tracking-wide mb-4">Servicio al cliente</h4>
                    <ul className="space-y-2 text-small">
                        <li><Link to="/ayuda" className="hover:text-rose-500 transition-colors duration-200">Centro de ayuda</Link></li>
                        <li><Link to="/envios" className="hover:text-rose-500 transition-colors duration-200">Envíos y entregas</Link></li>
                        <li><Link to="/devoluciones" className="hover:text-rose-500 transition-colors duration-200">Cambios y devoluciones</Link></li>
                        <li><Link to="/garantia" className="hover:text-rose-500 transition-colors duration-200">Garantía</Link></li>
                        <li><Link to="/contacto" className="hover:text-rose-500 transition-colors duration-200">Contáctanos</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-heading text-white text-small font-semibold uppercase tracking-wide mb-4">Mi cuenta</h4>
                    <ul className="space-y-2 text-small">
                        <li><Link to="/login" className="hover:text-rose-500 transition-colors duration-200">Iniciar sesión</Link></li>
                        <li><Link to="/registro" className="hover:text-rose-500 transition-colors duration-200">Crear cuenta</Link></li>
                        <li><Link to="/pedidos" className="hover:text-rose-500 transition-colors duration-200">Mis pedidos</Link></li>
                        <li><Link to="/favoritos" className="hover:text-rose-500 transition-colors duration-200">Favoritos</Link></li>
                        <li><Link to="/direcciones" className="hover:text-rose-500 transition-colors duration-200">Mis direcciones</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-heading text-white text-small font-semibold uppercase tracking-wide mb-4">Empresa</h4>
                    <ul className="space-y-2 text-small">
                        <li><Link to="/nosotros" className="hover:text-rose-500 transition-colors duration-200">Sobre Trendy</Link></li>
                        <li><Link to="/tiendas" className="hover:text-rose-500 transition-colors duration-200">Nuestras tiendas</Link></li>
                        <li><Link to="/trabaja" className="hover:text-rose-500 transition-colors duration-200">Trabaja con nosotros</Link></li>
                        <li><Link to="/prensa" className="hover:text-rose-500 transition-colors duration-200">Prensa</Link></li>
                        <li><Link to="/sostenibilidad" className="hover:text-rose-500 transition-colors duration-200">Sostenibilidad</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-heading text-white text-small font-semibold uppercase tracking-wide mb-4">Legal</h4>
                    <ul className="space-y-2 text-small">
                        <li><Link to="/terminos" className="hover:text-rose-500 transition-colors duration-200">Términos y condiciones</Link></li>
                        <li><Link to="/privacidad" className="hover:text-rose-500 transition-colors duration-200">Política de privacidad</Link></li>
                        <li><Link to="/cookies" className="hover:text-rose-500 transition-colors duration-200">Política de cookies</Link></li>
                        <li><Link to="/libro-reclamos" className="hover:text-rose-500 transition-colors duration-200">Libro de reclamos</Link></li>
                        <li><Link to="/sernac" className="hover:text-rose-500 transition-colors duration-200">Información SERNAC</Link></li>
                    </ul>
                </div>

            </div>

            {/* ─── Payment methods + Social ─── */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div className="flex flex-col gap-2">
                        <span className="text-small text-gray-400 uppercase tracking-wide">Medios de pago</span>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">VISA</span>
                            <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">MASTERCARD</span>
                            <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">AMEX</span>
                            <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">WEBPAY</span>
                            <span className="px-3 py-1 bg-white text-gray-900 text-[11px] font-bold rounded">MACH</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 md:items-end">
                        <span className="text-small text-gray-400 uppercase tracking-wide">Síguenos</span>
                        <div className="flex items-center gap-3">
                            <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-rose-500 transition-colors duration-200">
                                <img src={instagramIcon} alt="Instagram" className="w-4 h-4" />
                            </a>
                            <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-rose-500 transition-colors duration-200">
                                <img src={facebookIcon} alt="Facebook" className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* ─── Bottom: Copyright ─── */}
            <div className="bg-gray-950 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-small text-gray-500">
                    <p>&copy; 2026 Fashion Go! Todos los derechos reservados.</p>
                </div>
            </div>

        </footer>
    )
}