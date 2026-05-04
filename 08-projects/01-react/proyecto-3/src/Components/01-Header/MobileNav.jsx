import { AnimatePresence, motion } from "framer-motion";
import NavItem from "./NavItem.jsx";

const MotionMenu = motion.ul;

const mobileMenuVariants = {
    hidden: {
        opacity: 0,
        y: -10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.15,
            ease: "easeIn",
        },
    },
};

function MobileNav({ isOpen, onClose, navItems }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <MotionMenu
                    variants={mobileMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="md:hidden absolute top-[10vh] left-0 w-full bg-primary flex flex-col items-center gap-6 py-6 text-white text-sm"
                >
                    {navItems.map((item) => (
                        <NavItem
                            key={item.to}
                            to={item.to}
                            text={item.text}
                            onClick={onClose}
                        />
                    ))}
                </MotionMenu>
            )}
        </AnimatePresence>
    );
}

export default MobileNav;
