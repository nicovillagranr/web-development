import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import LogoSection from "./LogoSection.tsx";
import DesktopNav from "./DesktopNav.tsx";
import MobileNav from "./MobileNav.tsx";

import { navItems } from "./headerConstants.ts";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-primary flex justify-center">
      <nav className="w-[90%] min-h-[10vh] flex items-center gap-10 md:w-[80%]">
        <LogoSection />
        <DesktopNav navItems={navItems} />

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <FaTimes className="w-7 h-7" />
            ) : (
              <FaBars className="w-7 h-7" />
            )}
          </button>
        </div>

        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItems}
        />
      </nav>
    </header>
  );
}
export default Header;