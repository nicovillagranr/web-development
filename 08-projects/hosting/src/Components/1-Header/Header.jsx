import { CONTACT } from "@/constants/contact";
import "./Header.css";

export default function Header() {
  return (
    <header id="top" className="header">
      <div className="header__container">
        <a href="#top" className="header__brand">{CONTACT.name}</a>
      </div>
    </header>
  );
}
