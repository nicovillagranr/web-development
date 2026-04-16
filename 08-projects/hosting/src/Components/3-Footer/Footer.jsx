import { CONTACT } from "@/constants/contact";

import "./Footer.css"

const LINKS = [
  { label: "Email", href: `mailto:${CONTACT.email}` },
  { label: "GitHub", href: CONTACT.github, external: true },
  { label: "LinkedIn", href: CONTACT.linkedin, external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="footer">
      <div className="footer__container">
        <p className="footer__copyright">&copy; {year} {CONTACT.name}</p>

        <div className="footer__links">
          {LINKS.map(({ label, href, external }) => (
            <a key={label} href={href} className="footer__link" {...(external && { target: "_blank", rel: "noreferrer" })}>{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
