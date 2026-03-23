import { CONTACT, NAV_LINKS } from "@/constants/contact";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-base-900/75 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1080px,92vw)] items-center justify-between gap-4 py-3.5">
        <a
          href="#"
          className="font-heading text-[0.95rem] font-bold uppercase tracking-widest text-text-primary"
        >
          {CONTACT.name}
        </a>

        <nav className="flex items-center gap-5" aria-label="Navegación principal">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[0.88rem] font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
