import { CONTACT, NAV_LINKS } from "@/constants/contact";
import "./Header.css";

export default function Header() {
  return (
    <header id="top" className="header">
      <div className="header__container">
        <a href="#top" className="header__brand">{CONTACT.name}</a>
        <nav className="header__nav" aria-label="Navegación principal">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="header__nav-link">{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
