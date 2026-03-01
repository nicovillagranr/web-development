import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import HouseIcon from "../../assets/icons/1-Header/house.svg";
import MenuIcon from "../../assets/icons/1-Header/bars.svg";
import CloseIcon from "../../assets/icons/1-Header/x.svg";

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

const navItems = [
  { to: "/", text: "Home" },
  { to: "/services", text: "Services" },
  { to: "/portfolio", text: "Portfolio" },
  { to: "/team", text: "Our Team" },
  { to: "/news", text: "News" },
  { to: "/contact", text: "Contact Us" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-primary flex justify-center">
      <nav className="w-[90%] min-h-[10vh] flex items-center gap-10 md:w-[80%]">
        <div className="flex items-center flex-1">
          <div className="flex flex-col">
            <NavLink to="/" end className="flex items-center justify-center text-white text-xl tracking-widest ">
              <img src={HouseIcon} alt="Home" className="w-5 h-5" />
              <p>Projex</p>
            </NavLink>
            <span className="text-white text-xs font-md md:text-sm">Scalable Web Products</span>
          </div>

          <div className="flex-1" />

          <ul className="hidden md:flex gap-6 lg:gap-10 text-white text-sm font-medium">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                text={item.text}
              />
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <img
              src={isOpen ? CloseIcon : MenuIcon}
              alt={isOpen ? "Close menu icon" : "Open menu icon"}
              className="w-7 h-7"
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <MotionMenu
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                md:hidden absolute top-[10vh] left-0 w-full
                bg-primary flex flex-col items-center gap-6 py-6 text-white text-sm"
            >
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  text={item.text}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </MotionMenu>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Header;