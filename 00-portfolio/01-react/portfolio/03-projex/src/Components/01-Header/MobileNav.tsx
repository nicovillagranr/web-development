// Motion para animar elementos HTML
// AnimatePresence para animar componentes justo cuando van a desaparecer del DOM (cuando isOpen pasa a false)
import { AnimatePresence, motion } from "framer-motion";

// Seguridad de typado para asignar animaciones
import type { Variants } from "framer-motion";

// Accesibilidad: Cuando el usuario navega con el teclado, el enfoque se mantiene en la barra de navegación
import { FocusTrap } from "focus-trap-react";

// Componente
import NavItem from "./NavItem.tsx";

// Animaciones de entrada y salida
const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15, ease: "easeIn" } }
}

// Types de los props que recibe MobileNav
type MobileNavProps = {
    isOpen: boolean;
    onClose: () => void;
    navItems: { to: string; text: string }[];
};

function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
    // Envolvemos todo el mobile nav con AnimatePresence para animar la entrada y salida
    return (
        <AnimatePresence>
            {isOpen && (
                <FocusTrap focusTrapOptions={{ onDeactivate: onClose, escapeDeactivates: true }}>
                    <motion.ul
                        tabIndex={-1}
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="md:hidden absolute top-[10vh] left-0 w-full bg-primary flex flex-col items-center gap-6 py-6 text-white text-sm">
                        {/* Dentro del menú desplegable, renderizamos los mismos items del menú desktop */}
                        {navItems.map((item) => (
                            <NavItem
                                key={item.to}
                                to={item.to}
                                text={item.text}
                                onClick={onClose}
                            />
                        ))}
                    </motion.ul>
                </FocusTrap>
            )}
        </AnimatePresence>
    );
}

export default MobileNav;
